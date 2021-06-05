import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal } from 'react-bootstrap';
import mqtt from 'mqtt';
import ip from '../../config';

const UserProfile = () => {
	Notification.requestPermission();

	const [userProfileData, setUserProfileData] = useState({
		username: '',
		email: '',
		tripsReserved: []
	});
	const [show, setShow] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [trip, setTrip] = useState({
		path: [],
		hours: [],
		price: ''
	});

	const [tripIdToReview, setTripIdToReview] = useState('')
	const [messageToReview, setMessageToReview] = useState('')

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleCloseReview = () => setShowReview(false);
	const handleShowReview = () => setShowReview(true);

	const userLoggedIn = localStorage.getItem('userId')

	useEffect(() => {
		const getData = async () => {
			const fetchUserProfileData = await getUserProfileData();

			setUserProfileData({
				username: fetchUserProfileData.username,
				email: fetchUserProfileData.email,
				tripsReserved: fetchUserProfileData.tripsReserved
			});
		};

		getData();
		connect();
		sub();
	}, []);

	const getUserProfileData = async () => {
		const token = localStorage.getItem('token', token);
		const userId = localStorage.getItem('userId', userId);

		const req = await fetch(
			`http://${ip}:8080/users/profile/` + userId,
			{
				method: 'GET',
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token
				}
			}
		);

		const data = await req.json();

		return data;
	};

	const fetchTripInfo = async (tripId) => {
		const token = localStorage.getItem('token', token);

		const req = await fetch(`http://${ip}:8080/trips/` + tripId, {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});

		const res = await req.json();

		setTrip(res);

		return res;
	};

	const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt');

	const connect = () => {
		if (localStorage.getItem('tripId') !== null) {
			client.on('connect', () => {
				console.log(
					'connected to topic: ' + localStorage.getItem('tripId')
				);
			});
		}
	};

	const setTopicName = (tripName) => {
		if (localStorage.getItem('tripId') === null) {
			localStorage.setItem('tripId', tripName);
			connect();
			sub();
		}
	};

	const sub = () => {
		if (localStorage.getItem('tripId') !== null) {
			const topicSub =
				'pedwmptm/notification/' + localStorage.getItem('tripId');

			client.subscribe(topicSub, () => {
				console.log('subscribed');
				client.on('message', (topicSub, message) => {
					new Notification(message);
				});
			});
		}
	};

	const reviewATrip = async (userThatReviewed, tripThatReviewed, messageThatReviewed) => {
		const token = localStorage.getItem('token', token);

		const res = await fetch(`http://${ip}:8080/review`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify({ userId: userThatReviewed, tripId: tripThatReviewed, message: messageThatReviewed })
		});

		alert("Obrigado pelos seus comentários.")
	}

	const checkIfUserAlreadyReview = async (userThatWantsToReview, tripToReview, messageToReview) => {
		const token = localStorage.getItem('token', token);

		const res = await fetch(`http://${ip}:8080/review/${userThatWantsToReview}/${tripToReview}`  , {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});

		const data = await res.json();

		console.log(data)

		if(data == true){
			alert("ERRO: Já deu a sua opnião acerca desta viagem!");
		} else if (data == false) {
			reviewATrip(userThatWantsToReview, tripToReview, messageToReview)
		}
	}

	return (
		<Container>
			<Card style={{ width: '50rem' }}>
				<Card.Body>
					<Card.Title>Username:</Card.Title>
					<Card.Text>{userProfileData.username}</Card.Text>
					<Card.Title>Email:</Card.Title>
					<Card.Text>{userProfileData.email}</Card.Text>
					<Card.Title>Viagens:</Card.Title>
					<Card.Text>
						<Table
							striped
							borderless
							hover
							responsive='xl'
							width='200px'
						>
							<thead>
								<tr>
									<th>Data da viagem</th>
									<th>ID da viagem</th>
									<th>ID de reserva</th>
									<th>Detalhes</th>
								</tr>
							</thead>
							<tbody>
								{userProfileData.tripsReserved.map((trip) => (
									<tr>
										<th> {trip.date}</th>
										<th> {trip.tripId}</th>
										<th> {trip.reservationId} </th>
										<th>
											<Button
												variant='success'
												onClick={() => {
													handleShow();
													fetchTripInfo(trip.tripId);
												}}
											>
												+
											</Button>
											<Button
												variant='danger'
												onClick={() => {
													setTopicName(trip.tripId);
												}}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='16'
													height='16'
													fill='currentColor'
													class='bi bi-bell-fill'
													viewBox='0 0 16 16'
												>
													<path d='M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z' />
												</svg>
											</Button>
											<Button
												onClick={() => {
													setTripIdToReview(trip.tripId);
													handleShowReview();
												}}
											>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
													<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
													<path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
												</svg>
											</Button>
										</th>
									</tr>
								))}
							</tbody>
						</Table>
					</Card.Text>
				</Card.Body>
			</Card>

			<Modal show={show} onHide={handleClose}>
				<Modal.Dialog>
					<Modal.Header closeButton>
						<Modal.Title>Detalhes</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Table
							striped
							borderless
							hover
							responsive='xl'
							width='200px'
						>
							<thead>
								<tr>
									<th>Origem</th>
									<th>Destino</th>
									<th>Hora partida</th>
									<th>Hora chegada</th>
									<th>Preço</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{trip.path[0]}</td>
									<td>{trip.path[trip.path.length - 1]}</td>
									<td>{trip.hours[0]}</td>
									<td>{trip.hours[trip.hours.length - 1]}</td>
									<td>{trip.price}</td>
								</tr>
							</tbody>
						</Table>
					</Modal.Body>

					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={() => {
								handleClose();
							}}
						>
							Fechar
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal>

			<Modal show={showReview} onHide={handleCloseReview}>
				<Modal.Dialog>
					<Modal.Header closeButton>
						<Modal.Title>Faça um comentário acerca da sua viagem!</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={messageToReview} onChange={(e) => setMessageToReview(e.currentTarget.value)}></textarea>
					</Modal.Body>

					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={() => {
								checkIfUserAlreadyReview(userLoggedIn, tripIdToReview, messageToReview)
								handleCloseReview();
							}}
						>
							Adicionar comentário
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal>
		</Container>
	);
};

export default UserProfile;
