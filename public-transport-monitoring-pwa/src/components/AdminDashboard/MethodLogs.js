import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import worker_script from './CalculateAVG';

const MethodLogs = () => {
	const [chartData, setChartData] = useState({});

	var myWorker = new Worker(worker_script);

	const renderChart = async () => {
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

		myWorker.postMessage(data);

		myWorker.onmessage = (evt) => {
			setChartData({
				labels: ['Média', 'Máximo', 'Mínimo'],
				datasets: [
					{
						label: '# of Votes',
						data: [evt.data[2], evt.data[0], evt.data[1]],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}
				]
			});
		};
	};

	useEffect(() => {
		renderChart();
	}, []);

	return (
		<div>
			<Pie data={chartData} />
		</div>
	);
};

export default MethodLogs;
