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
import AccelerometerSensor from './components/Sensors/AccelerometerSensor';
import Socket from './components/Socket/Socket';
import UserProfile from './components/UserProfile/UserProfile';
import CreateVehicle from './components/Vehicle/Create/CreateVehicle';
import UserNotification from './components/Notification/UserNotification';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import DriverPage from './components/Driver/DriverPage';

function App() {
	return (
		<Router>
			<div>
				<Route
					path='/'
					exact
					render={(props) => (
						<div>
							<Header />
							<Login />
							<Footer />
						</div>
					)}
				/>
				<Route path='/driver' component={DriverPage} />
				<Route
					path='/map'
					exact
					render={() => (
						<div>
							<Header />
							<Map />
							<Footer />
						</div>
					)}
				/>
				<Route path='/admin' component={AdminDashboard} />
				<Route
					path='/reserve'
					exact
					render={(props) => (
						<div>
							<Header />
							<ReserveTrip />
							<Footer />
						</div>
					)}
				/>
				<Route
					path='/searchtrip'
					exact
					render={(props) => (
						<div>
							<Header />
							<SearchTrip />
							<Footer />
						</div>
					)}
				/>
				<Route
					path='/signup'
					exact
					render={(props) => (
						<div>
							<Header />
							<SignUp />
							<Footer />
						</div>
					)}
				/>
				<Route
					path='/userprofile'
					exact
					render={(props) => (
						<div>
							<Header />
							<UserProfile />
							<Footer />
						</div>
					)}
				/>
				<Route path='/createtrip' component={CreateTrip} />
				<Route path='/createvehicle' component={CreateVehicle} />
			</div>
		</Router>
	);
}

export default App;
