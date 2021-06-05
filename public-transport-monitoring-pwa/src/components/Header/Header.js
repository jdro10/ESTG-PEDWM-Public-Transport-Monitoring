import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Header = () => {
	const userId = localStorage.getItem('userId')

	const logoutCleanup = () => {
		localStorage.removeItem('userId')
		localStorage.removeItem('token')
		localStorage.removeItem('userRole')
		localStorage.removeItem('tripId')
	}

	let logout;

	if(userId != null){
		logout = <li>
					
					<Link to="/" style={{ color: '#FF0000' }} onClick={logoutCleanup}>Terminar sessão</Link>
				</li>
	}

	return (
		<div>
			<ul className='navigation'>
				<li>
				<Link to="/schedule">Horários</Link>
				</li>
				<li>
					<a>Bilhetes</a>
				</li>
				<li>
					<a>Como comprar</a>
				</li>
				<li>
					<Link to="/userprofile" style={{ color: '#2ECC71' }}>Conta</Link>
				</li>
				{logout}
			</ul>
			<section className='container'>
				<div className='logo'>
					<img
						src={'/imgs/TP.png'}
						alt='PTM'
						width='300px'
						height='150px'
					/>
				</div>
			</section>
		</div>
	);
};

export default Header;
