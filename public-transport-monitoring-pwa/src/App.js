import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import CreateTrip from './components/Trip/Create/CreateTrip';
import ReserveTrip from './components/Trip/Reserve/ReserveTrip';
import SearchTrip from './components/Trip/Search/SearchTrip';
import Map from './components/Map/Map';
import UserProfile from './components/UserProfile/UserProfile';
import CreateVehicle from './components/Vehicle/Create/CreateVehicle';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import DriverPage from './components/Driver/DriverPage';
import DriverPageTrip from './components/Driver/DriverPageTrip'
import ErrorPage from './components/ErrorPage/ErrorPage';
import Schedule from './components/Schedule/Schedule';

function App() {
	const userRole = localStorage.getItem('userRole')
	const userId = localStorage.getItem('userId')

	return (
		<Router>
			<div>
				{ userId != null ? 
					<Route path='/' 
						exact 
						render= { (props) => (
							<div>
								<Header />
								<SearchTrip />
								<Footer />
							</div>
					)}
				/> : <Route path='/' 
						exact 
						render= { (props) => (
							<div>
								<Header />
								<Login />
								<Footer />
							</div>
					)}/> 
				}

				{userRole === "DRIVER" || userRole === "ADMIN" ? <Route path='/driver' component={DriverPageTrip} /> : <Route path='/driver' component={ErrorPage} />}

				<Route
					path='/schedule'
					exact
					render={(props) => (
						<div>
							<Header />
							<Schedule />
							<Footer />
						</div>
					)}
				/>

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

				{userRole === "DRIVER" || userRole === "ADMIN" ? <Route path='/driver' component={DriverPageTrip} /> : <Route path='/driver' component={ErrorPage} />}

				{userRole === "DRIVER" || userRole === "ADMIN" ? <Route path='/driveradmin' component={DriverPage} /> : <Route path='/driveradmin' component={ErrorPage} />}

				{userRole === "DRIVER" || userRole === "ADMIN" ? <Route path='/createtrip' component={CreateTrip} /> : <Route path='/createtrip' component={ErrorPage} />}

				{userRole === "DRIVER" || userRole === "ADMIN" ? <Route path='/createvehicle' component={CreateVehicle} /> : <Route path='/createvehicle' component={ErrorPage} />}

				{userRole === "DRIVER" || userRole === "ADMIN" ? <Route path='/admin' component={AdminDashboard} /> : <Route path='/admin' component={ErrorPage} />}

			</div>
		</Router>
	);
}

export default App;
