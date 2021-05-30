import './App.css';
import React from 'react';
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
import Location from './components/Sensors/Location';
import AccelerometerSensor from './components/Sensors/AccelerometerSensor';
import Socket from './components/Socket/Socket';
import UserProfile from './components/UserProfile/UserProfile';
import CreateVehicle from './components/Vehicle/Create/CreateVehicle';
import UserNotification from './components/Notification/UserNotification'

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

				<Route path='/' exact render={(props) => <div></div>} />

				{/* <Speedometer /> */}
				{/* <AccelerometerSensor /> */}

				{/*<Socket /> */}

				{/* <Location /> */}
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

				<Route path='/userprofile' component={UserProfile} />

				<Route
					path='/createtrip'
					exact
					render={(props) => (
						<div>
							<CreateTrip />
						</div>
					)}
				/>

				<Route
					path='/createvehicle'
					exact
					render={(props) => (
						<div>
							<CreateVehicle />
						</div>
					)}
				/>
				<UserNotification/>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
