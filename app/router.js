import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Signup from './components/signup';

function requireAuth(next, replace) {
	if(!session.isAuthenticated()) {
		console.log(next);
		replace({nextPathname: next.location.pathname}, '/login')	
	}
}

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path='/' component={App} >
			<IndexRoute component={Dashboard} onEnter={requireAuth}/>
			<Route path='/login' component={Login} />
			<Route path='/signup' component={Signup} />
		</Route>
	</Router>
), document.getElementById('application'));
