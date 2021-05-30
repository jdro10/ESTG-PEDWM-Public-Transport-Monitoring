import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const SOCKET_URL = 'http://localhost:8080';

const Socket = () => {
	let stompClient;

	useEffect(() => {
		connect();

	}, [])

	const connect = () => {
		const socket = new SockJS(SOCKET_URL);
		const token = localStorage.getItem('token', token); 

		stompClient = Stomp.over(socket);
		stompClient.connect(token, function (frame) {
			stompClient.send(
				'/app/coordinates',
				{},
				JSON.stringify({ speedX: '3.5', speedY: '4.7', speedZ: '-3.1' })
			);
			stompClient.subscribe('/topic/sms', function (data) {
				console.log(data);
			});
		});
	};

	return <div></div>;
};

export default Socket;
