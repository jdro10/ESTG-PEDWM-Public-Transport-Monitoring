import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './DriverPage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mqtt from 'mqtt';

const DriverPage = () => {
	const [buttonStart, setButtonStart] = useState(true);
	const [buttonFinish, setButtonFinish] = useState(true);
	const [tripId, setTripId] = useState('')
	const [topic, setTopic] = useState('')
	const [topicLocation, setTopicLocation] = useState('')
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

	const outro = -8;
	const position = 10;

	const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')

	const connectToMQTT = () => {
		setTopic("pedwmptm/" + tripId)

		const connect = () => {
			client.on('connect', () => {
				console.log("connected")
			});
		}

		connect();
	}

	const connectToMQTTLocation = () => {
		setTopicLocation("pedwmptm/location/" + tripId)

		const connect = () => {
			client.on('connect', () => {
				console.log("connected to mqtt location")
			});
		}

		connect();
	}

	const publishDelay = (message) => {
		client.publish(topic, message, function () {
			console.log("Message is published");
		})
	}

	const location = navigator.geolocation.getCurrentPosition((position) => {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	});

	const publishLocation = (message) => {
		client.publish(topicLocation, message, function () {
			console.log("Message location published");
		})
	}

	return (
		<div className='flex-container root'>
			<div className='form-container'>
			<h3>Localização atual: </h3>
			<p>Latitude: {latitude}</p>
			<p>Longitude: {longitude}</p>
				<Form>
					<Form.Group id='input' size='lg'>
						<Form.Label>ID Viagem</Form.Label>
						<Form.Control
							type="text"
							value={tripId}
							onChange={(e) => setTripId(e.currentTarget.value)}
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
							connectToMQTT();
							connectToMQTTLocation();
						}}
					>
						{' '}
						Verificar ID{' '}
					</Button>
				</Form>

				<div className='buttons'>
					<Button
						variant='success'
						size='lg'
						disabled={buttonStart}
						onClick={() => {
							setButtonFinish(false);
						}}
					>
						{' '}
						Iniciar Viagem{' '}
					</Button>



					<Button
						variant='info'
						size='lg'
						disabled={buttonStart}
						onClick={() => {
							setButtonFinish(false);
							publishDelay(`A viagem ${tripId} encontra-se nas coordenadas: ${latitude} e ${longitude}`);
							publishLocation(latitude + "|" + longitude)
						}}
					>
						{' '}
						Paragem{' '}
					</Button>

					<Button variant='danger' size='lg' disabled={buttonFinish}>
						{' '}
						Terminar Viagem{' '}
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
