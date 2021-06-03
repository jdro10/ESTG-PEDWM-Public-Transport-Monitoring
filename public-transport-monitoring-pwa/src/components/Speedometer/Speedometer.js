import React, { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import './Speedometer.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ip from '../../config';

const Speedometer = () => {
	const [velocity, setVelocity] = useState(0);
	const [trip, setTrip] = useState('')
	const [listening, setListening] = useState(false);

	const connectToSSE = (tripId) => {
		console.log("conectado ao sse com id de viagem " + tripId)
		let eventSource = eventSource = new EventSource(`http://${ip}:8080/velocity/` + trip);

		eventSource.onmessage = (event) => {
			setVelocity(event.data)
			console.log(event)
		};
		eventSource.addEventListener('close', () =>
			eventSource.close()
		)
		eventSource.onerror = (err) => {
			console.error('EventSource failed:', err);
			eventSource.close();
		};
	}

	return (
		<div className='speedometer'>
			<Form>
				<Form.Group id='input' size='lg'>
					<Form.Label>ID da viagem</Form.Label>
					<Form.Control
						autoFocus
						placeholder='id9178938467198'
						value={trip}
						onChange={(e) => setTrip(e.currentTarget.value)}
					/>
				</Form.Group>
				<Button onClick={() => { connectToSSE(trip); }} >Search </Button>
			</Form>
			<ReactSpeedometer
				maxValue={160}
				value={velocity}
				valueFormat={'d'}
				customSegmentStops={[0, 40, 80, 120, 160]}
				segmentColors={['#a3be8c', '#ebcb8b', '#d08770', '#bf616a']}
				currentValueText={'Velocity: ${value} KM/h'}
				textColor={'black'}
			/>
		</div>
	);
};

export default Speedometer;
