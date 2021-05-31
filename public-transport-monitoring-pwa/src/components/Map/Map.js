import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Map = () => {
	const [position, setPosition] = useState(41.8);
	const [topicTripId, setTopicTripId] = useState('')

	const outro = -8;

	const [listening, setListening] = useState(false);
	let eventSource = undefined;

	const connectToSSE = (topicNameInput) => {
		if (!listening) {
			eventSource = new EventSource('http://localhost:8080/position/' + topicNameInput);

			eventSource.onmessage = (event) => {
				setPosition(event.data);
				console.log(event);
			};
			eventSource.onerror = (err) => {
				console.error('EventSource failed:', err);
				eventSource.close();
			};
			setListening(true);
		}
	}

	return (
			<div id='mapid'>
				<Container>
					<Form>
						<Form.Group id='input' size='lg' controlId='email'>
							<Form.Label>Introduza o ID da viagem</Form.Label>
							<Form.Control
								autoFocus
								placeholder='698123akm12n9'
								value={topicTripId}
								onChange={(e) => setTopicTripId(e.currentTarget.value)}
							/>
						</Form.Group>
						<Button
							onClick={() => { connectToSSE(topicTripId); }}
							variant='success'
							block
							size='lg'
						>
							Procurar
						</Button>
					</Form>
				</Container>
				<br></br>
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
	);
};

export default Map;
