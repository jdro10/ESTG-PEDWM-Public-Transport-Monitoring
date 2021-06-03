import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
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
