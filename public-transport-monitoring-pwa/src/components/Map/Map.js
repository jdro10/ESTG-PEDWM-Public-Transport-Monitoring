import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

const Map = () => {
	const [position, setPosition] = useState(41.8);

	const outro = -8;

	const [listening, setListening] = useState(false);
	let eventSource = undefined;

	useEffect(() => {
		if (!listening) {
			eventSource = new EventSource('http://localhost:8080/position/1/12345spring');

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
		return () => {
			eventSource.close();
			console.log('event closed');
		};
	}, []);

	return (
		<div id='mapid'>
			<label>Id da viagem: </label><input></input>
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
