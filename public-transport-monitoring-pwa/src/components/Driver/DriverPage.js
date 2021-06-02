import { useState, useEffect, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import './DriverPage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mqtt from 'mqtt';
import { Accelerometer } from 'motion-sensors-polyfill';

const DriverPage = () => {
	const [buttonStart, setButtonStart] = useState(true);
	const [buttonFinish, setButtonFinish] = useState(true);
	const [tripId, setTripId] = useState('')
	const [topicNotification, setTopicNotification] = useState('')
	const [topicLocation, setTopicLocation] = useState('')
	const [topicAccelerometer, setTopicAccelerometer] = useState('')
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [x, setX] = useState('')
	const [y, setY] = useState('')
	const [z, setZ] = useState('')
	const [connectedNotifications, setConnectedNotifications] = useState(false)
	const [connectedLocation, setConnectionLocation] = useState(false)
	const [connectedAccelerometer, setConnectedAccelerometer] = useState(false)

	const location = navigator.geolocation.getCurrentPosition((position) => {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	});

	const clientNotifications = mqtt.connect('ws://broker.emqx.io:8083/mqtt')

	const mqttNotifications = () => {
		setTopicNotification("pedwmptm/" + tripId)

		const con = clientNotifications.on('connect', () => {
			setConnectedNotifications(true)
			console.log("connected to MQTT notifications")
		});

		alert("cima con")

		con();

		alert("baixo con")
	}

	const publishNotification = (message) => {
		clientNotifications.publish(topicNotification, message, function () {
			console.log("Message is published");
		})
	}

	const clientLocation = mqtt.connect('ws://broker.emqx.io:8083/mqtt')

	const mqttLocation = async () => {
		await setTopicLocation("pedwmptm/location/" + tripId)

		clientLocation.on('connect', async () => {
			await setConnectionLocation(true)
			console.log("connected to MQTT location")
		});
	}

	const publishLocation = (message) => {
		clientAccelerometer.publish(topicLocation, message, function () {
			console.log("Message location published");
		})
	}

	const clientAccelerometer = mqtt.connect('ws://broker.emqx.io:8083/mqtt')

	const mqttAccelerometer = async () => {
		await setTopicAccelerometer("pedwmptm/accelerometer")

		clientAccelerometer.on('connect', async () => {
			await setConnectedAccelerometer(true)
			console.log("connected to MQTT accelerometer")
		})
	}

	const publishAccelerometer = (message) => {
		clientAccelerometer.publish(topicAccelerometer, message, function () {
			console.log("Message is published acc");
		})
	}

	let accelerometer;

	if (typeof Accelerometer === "function") {
		accelerometer = new Accelerometer({ frequency: 60 });
		accelerometer.addEventListener('error', event => {
			if (event.error.name === 'NotAllowedError') {
				console.log("not allowed");
			} else if (event.error.name === 'NotReadableError') {
				console.log("cant read data");
			}
		});
		accelerometer.addEventListener('reading', (e) => {
			setX(e.target.x); setY(e.target.y); setZ(e.target.z)

			// if (e.target.x > 10 || e.target.y > 10 || e.target.z > 10) {

			// 	console.log(e.target.x)
			// 	publishAccelerometer()
			// }
		});
		accelerometer.start();
	}

	return (
		<div className='flex-container root'>
			<div className='form-container'>
				<h3>Localização atual: </h3>
				<p>Latitude: {latitude}</p>
				<p>Longitude: {longitude}</p>
				<h1> {z} </h1>
				{ connectedNotifications ? <h2>Viagem iniciada com sucesso!</h2> : <h2>A iniciar viagem... Por favor aguarde...</h2>}
				
				{/* connectedAccelerometer && connectedLocation */}
				<Form>
					<Form.Group id='input' size='lg'>
						<Form.Label>ID Viagem</Form.Label>
						<Form.Control
							type="text"
							value={tripId}
							onChange={ (e) => setTripId(e.currentTarget.value)}
							autoFocus
							placeholder='id12931283b59230'
						/>
					</Form.Group>
					<Button
						variant='primary'
						block
						size='lg'

						onClick={() => {
							setButtonStart(false);
						}}
					>
						Verificar ID
					</Button>
				</Form>

				<div className='buttons'>
					<Button
						variant='success'
						size='lg'
						disabled={buttonStart}
						
						onClick={() => {
							setButtonFinish(false);
							alert(tripId)
							mqttNotifications();
							//mqttLocation();
							//mqttAccelerometer();
						}}
					>
						Iniciar Viagem
					</Button>

					<Button
						variant='info'
						size='lg'
						disabled={buttonStart}
						onClick={() => {
							setButtonFinish(false);
							publishNotification(`A viagem ${tripId} encontra-se nas coordenadas: ${latitude} e ${longitude}`);
							publishLocation(latitude + "|" + longitude)
						}}
					>
						Paragem
					</Button>

					<Button variant='danger' size='lg' disabled={buttonFinish}>
						Terminar Viagem
					</Button>
				</div>
			</div>

			<div id='mapid'>
				<MapContainer
					center={[latitude, longitude]}
					zoom={8}

				>
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<Marker position={[latitude, longitude]}>
						<Popup>
							Longitude: {longitude} <br /> Latitude: {latitude}.
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		</div>
	);
};

export default DriverPage;
