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

function App() {
	const [allTrips, setAllTrips] = useState([])

	useEffect(() => {
		const getTrips = async () => {
			const tripsFromServer = await getAllTrips();
			setAllTrips(tripsFromServer);
		}

		getTrips();

	}, [])

    const getAllTrips = async() => {
        const req = await fetch('http://localhost:8080/trips')

        const data = await req.json()

        return data;
    }

	return (
		<Router>
			<div>
				<Header />

				<Route path='/' exact render={(props) => (
					<div>
						<Login />
					</div>
          		)} />
           		
				<Route path='/reserve' exact render={ (props) => (
					<div>
						<ReserveTrip trips={allTrips}/>
					
					</div>
				)} />

				<Route path='/searchtrip' exact render={ (props) => (
					<div>
						<SearchTrip />
					</div>
				)} />
				
				<Route path='/signup' component={SignUp} />
				{/* <CreateTrip /> */ }
				<Footer />
			</div>
		</Router>
	);
}

export default App;
