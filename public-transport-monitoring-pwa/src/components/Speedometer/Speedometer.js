import React, { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import './Speedometer.css';

const Speedometer = () => {
	const [velocity, setVelocity] = useState(0);

	const [listening, setListening] = useState(false);
	let eventSource = undefined;

	useEffect(() => {
		if (!listening) {
			eventSource = new EventSource('http://localhost:8080/velocity');
			eventSource.onmessage = (event) => {
				setVelocity(event.data);
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
		<div className='speedometer'>
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
