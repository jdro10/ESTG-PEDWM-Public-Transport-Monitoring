import './login.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SearchTrip from '../Trip/Search/SearchTrip';

const Login = () => {
	const storedJwt = localStorage.getItem('token');
	const [jwt, setJwt] = useState(storedJwt || null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loggedIn, setLoggedIn] = useState(false)

	const getJwt = async (username, password) => {
		const res = await fetch('http://localhost:8080/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ username: username, password: password })
		});

		const resLoggin = await res.json();

		localStorage.setItem('token', resLoggin.token);

		setJwt(resLoggin.token);

		const getToken = localStorage.getItem('token', getToken);

		const reqUser = await fetch('http://localhost:8080/users/getByUsername/' + username, {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + getToken
			}
		});

		const resUser = await reqUser.json();

		localStorage.setItem('userId', resUser.id)

		setLoggedIn(true);
	};

	return (
		<div id='loginDiv' className='Login'>
			<Form>
				<Form.Group id='input' size='lg' controlId='email'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						autoFocus
						placeholder='exemplo'
						value={username}
						onChange={(e) => setUsername(e.currentTarget.value)}
					/>
				</Form.Group>
				<Form.Group id='input' size='lg' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						placeholder='********'
					/>
				</Form.Group>
				<Button
					onClick={() => { getJwt(username, password); }}
					variant='success'
					block
					size='lg'
				>
					{' '}
					Login{' '}

				</Button>
				<div id='signupMsg'>
					<Form.Label>
						Não tem uma conta?{' '}
						<Link to='/signup'>Registe-se aqui.</Link>
					</Form.Label>
				</div>
			</Form>
			{loggedIn ? <Redirect to="/searchtrip" /> : ''}
		</div>
	);
};

export default Login;
