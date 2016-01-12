import React from 'react';
import {Link} from 'react-router';

const Login = React.createClass({
	render() {
		return (
			<div className="login-container">
				<h1>Login</h1>
				<form>
					<input type="text" placeholder='Email'/>
					<input type="password" placeholder='Password'/>
				</form>
				<p>First time? <Link to='/signup'>Click here to sign up</Link></p>
			</div>

		)
	}
})

export default Login;