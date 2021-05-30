import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import mqtt from 'mqtt';

const UserNotification = () => {
	Notification.requestPermission();

	const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')
	const topic = "testtopic/estg-pedwm"

	const connect = () => {
		client.on('connect', () => {
			console.log('connected');
		});
	}

	useEffect(() => {
		connect()
	}, [])

	client.subscribe(topic, () => {
		console.log("subscribed")
		client.on('message', (topic, message) => {
			showNotification(message.toString())
		})
	})

	const showNotification = (message) => {
		return new Notification(message);
	}

	return (
		<div>
		</div>
	)
}

export default UserNotification
