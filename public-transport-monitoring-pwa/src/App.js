import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateTrip from './components/Trip/Create/CreateTrip';

function App() {
	return (
		<Router>
			<div>
				<Header />
				{/* <Route path='/' exact render={(props) => (
            <div>
              <Login />
            </div>
          )} />
          <Route path='/signup' component={SignUp} /> */}
				<CreateTrip />
				<Footer />
			</div>
		</Router>
	);
}

export default App;
