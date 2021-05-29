import React from 'react'
import { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import Button from 'react-bootstrap/Button';

const UserNotification = () => {
    Notification.requestPermission();

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

	const [client, setClient] = useState(null);
	const [payload, setPayload] = useState({});

	useEffect(() => {
		if (client) {
            mqttSub();
			client.on('message', (topic, message) => {
				const payload = { topic, message: message.toString() };
				setPayload(payload);
				console.log(payload);

                new Notification("teste")
			});
		}
	});

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

	const mqttSub = () => {
		if (client) {
			client.subscribe(record.topic, 0, (error) => {
				if (error) {
					console.log('Subscribe to topics error', error);
					return;
				}

			});
		}
	};

    const showNotifiction = () => {
        return new Notification("Notificação teste");
    }

    return (
        <div>
            <Button variant="success" onClick={() => {mqttConnect(url, options); showNotifiction();}}>Subscrever notificações de viagens</Button>
        </div>
    )
}

export default UserNotification
