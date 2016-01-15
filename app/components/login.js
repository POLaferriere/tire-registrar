import React from 'react';
import {Link, History} from 'react-router';
import {Alert} from 'react-bootstrap';
import TransitionGroup from 'react-addons-css-transition-group';

const Login = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			email: '',
			password: '',
			error: false,
		}
	},

	handleChange(input, e) {
		this.setState({
			[input]: e.target.value,
		})
	},

	handleLogin(e) {
		e.preventDefault();
		const username = this.state.email.toLowerCase();
		const password = this.state.password;
		session.authenticate({username, password}).then(() => {
			if(this.props.location.state && this.props.location.state.nextPathname) {
				this.history.push({}, this.props.location.state.nextPathname)
			} else {
				this.history.push({}, '/')
			}
		}, (res) => {
			this.setState({
				error: true,
			})
		})
	},

	closeMessage() {
		this.setState({
			error: false,
		})
	},

	render() {
		return (
			<div className="login-page">
				<TransitionGroup 
          transitionName='error' 
          transitionAppear={true} 
          transitionAppearTimeout={500}  
          transitionEnterTimeout={500} 
          transitionLeaveTimeout={500}
        >
          {this.state.error &&
            <Alert className='login-error' bsStyle='danger' key={1} onDismiss={this.closeMessage}>
              {"There was an error logging in.  Please check your username and password and try again."}
            </Alert>}
        </TransitionGroup>
				<div className="login-container">
					<h1 className='login-title'>Login</h1>

					

					<form className='login-form' onSubmit={this.handleLogin}>
						<input type="text" placeholder='Email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>
						<input type="password" placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
						<input type="submit"/>
					</form>
					<p>First time? <span className="link"><Link to='/signup'>Click here to sign up</Link></span></p>
				</div>
			</div>

		)
	}
})

export default Login;