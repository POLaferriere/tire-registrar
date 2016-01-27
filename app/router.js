import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Logout from './components/logout';
import Signup from './components/signup';
import Settings from './components/settings';
import DBTest from './components/db-test';

function requireAuth(next, replace) {
	if(!session.isAuthenticated()) {
		replace({nextPathname: next.location.pathname}, '/login')	
	}
}

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path='/' component={App} >
			<IndexRoute component={Dashboard} onEnter={requireAuth}/>
			<Route path='/login' component={Login} />
			<Route path='/signup' component={Signup} />
			<Route path='/logout' component={Logout} />
			<Route path='/settings' component={Settings} />
			<Route path='/db-test' component={DBTest} />

		</Route>
	</Router>
), document.getElementById('application'));
