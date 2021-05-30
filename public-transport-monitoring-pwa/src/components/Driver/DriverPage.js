import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './DriverPage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import mqtt from 'mqtt';

const DriverPage = () => {
	const [buttonStart, setButtonStart] = useState(true);
	const [buttonFinish, setButtonFinish] = useState(true);

	const outro = -8;
	const position = 10;

	const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')
	const topic = "testtopic/estg-pedwm"

	const connect = () => {
		client.on('connect', () => {
			console.log("connected")
		});
	}

	useEffect(() => {
		connect()
	}, [])

	const publishDelay = (message) => {
		client.publish(topic, message, function () {
			console.log("Message is published");
		})
	}

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
							publishDelay('A viagem X encontra-se na paragem X');
						}}
					>
						{' '}
						Paragem{' '}
					</Button>

					<Button variant="danger" disabled={buttonStart} onClick={() => { publishDelay('Informamos que a viagem X encontra-se atrasada X minutos') }}>Alertar atraso</Button>

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
						url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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
