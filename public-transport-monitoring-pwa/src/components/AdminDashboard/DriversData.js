import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const DriversData = () => {
	const [chartData, setChartData] = useState({});

	useEffect(() => {
		renderChart();
	}, []);

	const renderChart = async () => {
		let employees = [];
		let numbers = [];
		const getToken = localStorage.getItem('token', getToken);

		const req = await fetch('http://localhost:8080/admin/employees', {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getToken
			}
		});

		const res = await req.json();

		console.log(res);

		await res.forEach((item) => {
			employees.push(item.employeeId);
			numbers.push(item.numberOfTrips);
		});

		setChartData({
			labels: employees,
			datasets: [
				{
					label: '# of Trips',
					data: numbers,
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

	return (
		<div>
			<Bar data={chartData} />
		</div>
	);
};

export default DriversData;
