import React from 'react';

const TripMonitoring = () => {
	const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt');

	const connect = () => {
			client.on('connect', () => {
				console.log(
					'connected to topic: acc' 
				);
			});
	};

	const sub = () => {
			const topicSub = 'pedwmptm/accelerometer';

			client.subscribe(topicSub, () => {
				console.log('subscribed');
				client.on('message', (topicSub, message) => {
					console.log(message);
				});
			});

	};

	return <div></div>;
};

export default TripMonitoring;
