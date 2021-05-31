import React from 'react';

const MethodLogs = () => {
	const getAllMetrics = async () => {
		const getToken = localStorage.getItem('token', getToken);

		const req = await fetch('http://localhost:8080/admin/methodmetrics', {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getToken
			}
		});

		const data = await req.json();

		console.log(data);

		return data;
	};

	getAllMetrics();

	return <div></div>;
};

export default MethodLogs;
