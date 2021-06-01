import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const MethodLogs = () => {
	const [chartData, setChartData] = useState({});

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

		let sum = 0;
		let max = data[0].executionTime;
		let min = data[0].executionTime;
		let count = 0;

		data.forEach((item) => {
			if (item.executionTime != 0) {
				sum += item.executionTime;
				count++;
				if (item.executionTime >= max) {
					max = item.executionTime;
				}
				if (item.executionTime <= min) {
					min = item.executionTime;
				}
			}
		});

		console.log(sum);

		console.log(sum / data.length);

		setChartData({
			labels: ['Média', 'Máximo', 'Mínimo'],
			datasets: [
				{
					label: '# of Votes',
					data: [sum / data.length, max, min],
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

		return data;
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
