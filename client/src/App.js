import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import './App.css';

const App = () => (
	<Fragment>
		<h1>Application!</h1>
		<Navbar />
		<Landing />
	</Fragment>
);

export default App;
