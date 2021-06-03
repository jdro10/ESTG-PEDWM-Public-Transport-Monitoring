import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './DriverPage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mqtt from 'mqtt';
import { Accelerometer } from 'motion-sensors-polyfill';
import { useLocation } from 'react-router-dom';

const DriverPage = ({ tripId }) => {
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [topicLocation, setTopicLocation] = useState('')
	const [topicNotification, setTopicNotification] = useState('')
	const [topicAccelerometer, setTopicAccelerometer] = useState('')
	
	const routerlocation = useLocation();
	const id = routerlocation.state.tripId;

	useEffect(() => {		
		mqttNotifications(id);
		mqttLocation(id);
		mqttAccelerometer(id);

		const location = navigator.geolocation.getCurrentPosition((position) => {
			setLatitude(position.coords.latitude);
			setLongitude(position.coords.longitude);
		});		
	}, [])

	const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')


	const mqttNotifications = (idparam) => {
		setTopicNotification("pedwmptm/notification/" + idparam)

		client.on('connect', () => {
			console.log("Connected to MQTT notifications")
		});
	}

	const publishNotification = (message) => {
		client.publish(topicNotification, message, function () {
			console.log("Message notification is published at topic " + topicNotification);
		})
	}

	const mqttLocation = (idparam) => {
		setTopicLocation("pedwmptm/location/" + idparam)

		client.on('connect', () => {
			console.log("Connected to MQTT location")
		});
	}

	const publishLocation = (message) => {
		client.publish(topicLocation, message, function () {
			console.log("Message location published at topic: " + topicLocation);
		})
	}

	const mqttAccelerometer = (idparam) => {
		setTopicAccelerometer("pedwmptm/accelerometer")

		client.on('connect', () => {
			console.log("connected to MQTT accelerometer")
		})
	}

	const publishAccelerometer = (message) => {
		client.publish(topicAccelerometer, message, function () {
			console.log("Message accelerometer published at topic: " + topicAccelerometer);
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
			if(e.target.z > 20){
				publishAccelerometer("Muitas vibrações detetadas na viagem " + id + "!");
			}
		});

		accelerometer.start();
	}

	return (
		<div className='flex-container root'>
			<div className='form-container'>
				<h3>Localização atual: </h3>
				<p>Latitude: {latitude}</p>
				<p>Longitude: {longitude}</p>
				<div className='buttons'>
					<Button
						variant='success'
						size='lg'
					>
						Iniciar Viagem
					</Button>

					<Button
						variant='info'
						size='lg'
						onClick={() => {
							publishNotification(`A viagem ${id} encontra-se nas coordenadas: ${latitude} e ${longitude}`);
							publishLocation(latitude + "|" + longitude)
						}}
					>
						Paragem
					</Button>

					<Button variant='danger' size='lg'>
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
