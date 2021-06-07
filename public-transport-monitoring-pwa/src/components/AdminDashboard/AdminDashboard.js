import React, { useEffect } from 'react';
import { CardDeck, Card, Container } from 'react-bootstrap';
import mqtt from 'mqtt';
import Speedometer from '../Speedometer/Speedometer';
import DriversData from './DriversData';
import MethodLogs from './MethodLogs';
import VehiclesData from './VehiclesData';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './admindashboard.css';

const AdminDashboard = () => {
	const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt');

	useEffect(() => {
		connect();
		sub();
	}, []);

	const connect = () => {
		client.on('connect', () => {
			console.log(
				'connected to topic: ' + localStorage.getItem('tripId')
			);
		});
	};

	const sub = () => {
		const topicSub = 'pedwmptm/accelerometer';

		client.subscribe(topicSub, () => {
			client.on('message', (topicSub, message) => {
				new Notification(message);
			});
		});
	};

	return (
		<div>
			<nav class='navbar navbar-expand-lg navbar-light bg-light'>
				<div class='container-fluid'>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span class='navbar-toggler-icon'></span>
					</button>
					<div
						class='collapse navbar-collapse'
						id='navbarSupportedContent'
					>
						<ul class='navbar-nav me-auto mb-2 mb-lg-0'>
							<li class='nav-item'>
								<Link to='/createvehicle' className='nav-link'>
									Adicionar veículo
								</Link>
							</li>
							<li class='nav-item'>
								<Link to='/createtrip' className='nav-link'>
									Adicionar viagem
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div className='container'>
				<div className='row'>
					<div className='col-md-8'>
						<div className='row'>
							<div className='col-md-6 p-2'>
								<Card>
									<Card.Body>
										<Card.Title>
											Condutores mais requisitados
										</Card.Title>
										<Card.Text>
											<DriversData />
										</Card.Text>
									</Card.Body>
								</Card>
							</div>
							<div className='col-md-6 p-2'>
								<Card>
									<Card.Body>
										<Card.Title>
											Veículos mais requisitados
										</Card.Title>
										<Card.Text>
											<VehiclesData />
										</Card.Text>
									</Card.Body>
								</Card>
							</div>
							<div className='col-md-6 p-2'>
								<Card>
									<Card.Body>
										<Card.Title>Velocímetro</Card.Title>
										<Card.Text>
											<Speedometer />
										</Card.Text>
									</Card.Body>
								</Card>
							</div>
						</div>
					</div>

					<div className='col-md-4 p-2'>
						<Card>
							<Card.Body>
								<Card.Title>Registos de logs</Card.Title>
								<Card.Text>
									<MethodLogs />
								</Card.Text>
							</Card.Body>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
