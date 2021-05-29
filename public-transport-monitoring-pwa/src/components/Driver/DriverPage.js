import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './DriverPage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mqtt from 'mqtt';

const DriverPage = () => {
	const qosOption = [
		{
			label: '0',
			value: 0
		},
		{
			label: '1',
			value: 1
		},
		{
			label: '2',
			value: 2
		}
	];

	const [buttonStart, setButtonStart] = useState(true);
	const [buttonFinish, setButtonFinish] = useState(true);
	const [client, setClient] = useState(null);
	const [payload, setPayload] = useState({});

	useEffect(() => {
		if (client) {
			client.on('message', (topic, message) => {
				const payload = { topic, message: message.toString() };
				setPayload(payload);
				console.log(payload);
			});
		}
	});

	const outro = -8;
	const position = 10;

	const mqttConnect = (url, options) => {
		setClient(mqtt.connect(url, options));
		console.log('conectado');
	};

	const url = `ws://broker.emqx.io:8083/mqtt`;

	const options = {
		keepalive: 30,
		protocolId: 'MQTT',
		protocolVersion: 4,
		clean: true,
		reconnectPeriod: 1000,
		connectTimeout: 30 * 1000,
		will: {
			topic: 'WillMsg',
			payload: 'Connection Closed abnormally..!',
			qos: 0,
			retain: false
		},
		rejectUnauthorized: false
	};
	options.clientId = '123';
	options.username = '123';
	options.password = '123';

	const record = {
		topic: 'testtopic/react23',
		qos: qosOption[0]
	};

	const mqttPublish = () => {
		if (client) {
			console.log('cliente');
			client.publish(record.topic, 'ola', 0, (error) => {
				if (error) {
					console.log('Publish error: ', error);
				}
			});
		}
	};

	const mqttSub = () => {
		if (client) {
			console.log('aqui');
			client.subscribe(record.topic, 0, (error) => {
				if (error) {
					console.log('Subscribe to topics error', error);
					return;
				}
			});
		}
	};

	return (
		<div className='flex-container root'>
			<div className='form-container'>
				<Form>
					<Form.Group id='input' size='lg' controlId='email'>
						<Form.Label>Id Viagem</Form.Label>
						<Form.Control autoFocus placeholder='exemplo' />
					</Form.Group>

					<Button
						variant='primary'
						block
						size='lg'
						onClick={() => {
							setButtonStart(false);
							mqttConnect(url, options);
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
							mqttPublish();
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
							mqttSub();
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
					center={[outro, position]}
					zoom={13}
					scrollWheelZoom={true}
				>
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
					/>
					<Marker position={[position, outro]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		</div>
	);
};

export default DriverPage;
