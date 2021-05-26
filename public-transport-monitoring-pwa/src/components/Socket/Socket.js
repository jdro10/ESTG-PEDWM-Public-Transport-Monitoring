import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const SOCKET_URL = 'http://localhost:8080';

const Socket = () => {
	let stompClient;

	//TENHO QUE PASSEAR O TOKEN

	const connect = () => {
		const socket = new SockJS(
			`${SOCKET_URL}/ws-socket?access_token=eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIkRSSVZFUiJdLCJpYXQiOjE2MjE5ODk2ODcsImV4cCI6MTYyMjAxODQ4N30.rc0AlUSfbC5bCZmwARtyTGe6-B28tf_hp50Qw63lRkqbU-weAhXHpKmwCVmvviuBtCpZ8wwi1Tc4iEMVW4biQw`
		);
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function (frame) {
			stompClient.send(
				'/app/coordinates',
				{},
				JSON.stringify({ speedX: '3.5', speedY: '4.7', speedZ: '-3.1' })
			);
			stompClient.subscribe('/topic/sms', function (data) {
				console.log(data);
			});
		});
		// const socket = new SockJS(`${SOCKET_URL}/gs-guide-websocket`);
		// stompClient = Stomp.over(socket);
		// stompClient.connect({}, function (frame) {
		// 	stompClient.send(
		// 		'/app/hello',
		// 		{},
		// 		JSON.stringify({ name: 'Joao' })
		// 	);
		// 	stompClient.subscribe('/topic/greetings', function (data) {
		// 		console.log(data);
		// 	});
		// });
	};

	connect();

	return <div></div>;
};

export default Socket;
