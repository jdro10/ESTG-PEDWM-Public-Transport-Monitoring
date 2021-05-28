import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import DriverPage from '../components/Driver/DriverPage';

const Main = () => {
	return (
		<Router>
			<Switch>
				<Route component={App} path='/' exact />
				<Route component={DriverPage} path='/driver' />
			</Switch>
		</Router>
	);
};

export default Main;
