import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddPortfolio from './components/profile-form/AddPortfolio';
import SavedHouses from './components/favourites/SavedHouses';
import CreateSearch from './components/properties-form/CreateSearch';


// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import './App.css';

// run the auth token check first time app loads
if(localStorage.token) { setAuthToken(localStorage.token); }

const App = () => { 
	
	// gotcha unless add the 2nd param of the array
	useEffect(() => {
		
		store.dispatch(loadUser());
	}, []);
	
	return (
	<Provider store={store}>
<Router>
		<Fragment>
			<Navbar />
			<Route exact path="/" component={Landing} />
			<section className="container">
				<Alert />
				<Switch>
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<PrivateRoute exact path="/create-profile" component={CreateProfile} />
					<PrivateRoute exact path="/edit-profile" component={EditProfile} />
					<PrivateRoute exact path="/add-portfolio" component={AddPortfolio} />
					<PrivateRoute exact path="/search" component={CreateSearch} />
					<PrivateRoute exact path="/saved-favourites" component={SavedHouses} />
				</Switch>
			</section>
		</Fragment>
	</Router>
	</Provider>
	
)};

export default App;
