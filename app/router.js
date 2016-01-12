import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/app';
import Login from './components/login';
import Signup from './components/signup'

function requireAuth(next, replace) {
	if(!session.isAuthenticated()) {
		replace({nextPathname: next.location.state}, '/login')	
	}
}

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path='/' component={App} onEnter={requireAuth} />
		<Route path='/login' component={Login} />
		<Route path='/signup' component={Signup} />
	</Router>
), document.getElementById('application'));
