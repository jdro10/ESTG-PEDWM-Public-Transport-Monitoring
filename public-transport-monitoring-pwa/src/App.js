import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateTrip from './components/Trip/Create/CreateTrip';
import ReserveTrip from './components/Trip/Reserve/ReserveTrip';
import SearchTrip from './components/Trip/Search/SearchTrip';
import Speedometer from './components/Speedometer/Speedometer';
import Map from './components/Map/Map';
import Location from './components/Location/Location';

function App() {
	return (
		<Router>
			<div>
				<Header />

				<Route
					path='/'
					exact
					render={(props) => (
						<div>
							<Login />
						</div>
					)}
				/>

				{ /* <Speedometer /> */}

				<Location />
				<Route
					path='/map'
					exact
					render={() => (
						<div>
							<Map />
						</div>
					)}
				/>

				<Route
					path='/reserve'
					exact
					render={(props) => (
						<div>
							<ReserveTrip />
						</div>
					)}
				/>

				<Route
					path='/searchtrip'
					exact
					render={(props) => (
						<div>
							<SearchTrip />
						</div>
					)}
				/>

				<Route path='/signup' component={SignUp} />
				{/* <CreateTrip /> */}
				<Footer />
			</div>
		</Router>
	);
}

export default App;
