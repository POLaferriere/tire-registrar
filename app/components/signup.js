import React from 'react';
import {Link, History} from 'react-router';
import TransitionGroup from 'react-addons-css-transition-group';
import {Alert} from 'react-bootstrap';

import User from '../models/user';

const Signup = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			email: '',
			password1: '',
			password2: '',
			name: '',
			address: '',
			city: '',
			state: '',
			zip: '',
			errorMessage: '',
		}
	},

	handleChange(input, e) {
		this.setState({
			[input]: e.target.value
		})
	},

	closeMessage() {
		this.setState({
			errorMessage: ''
		})
	},

	handleSubmit(e) {
		e.preventDefault();

		const regex = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/gm
		
		if(!this.state.email) {
			this.setState({
				errorMessage: 'You must enter an email'
			})
		} else if(!regex.test(this.state.email)) {
			this.setState({
				errorMessage: 'Email is not valid',
			})
		} else if(!this.state.password1) {
			this.setState({
				errorMessage: 'Please enter a password'
			})
		} else if(!this.state.password2) {
			this.setState({
				errorMessage: 'Please repeat your password'
			})
		} else if (this.state.password1 != this.state.password2) {
			this.setState({
				errorMessage: 'Passwords do not match'
			})
		} else if (!this.state.name) {
			this.setState({
				errorMessage: 'Please enter a name'
			})
		} else if (!this.state.address) {
			this.setState({
				errorMessage: 'Please enter an address'
			})
		} else if (!this.state.city) {
			this.setState({
				errorMessage: 'Please enter a city'
			})
		} else if (!this.state.state) {
			this.setState({
				errorMessage: 'Please choose a state'
			})
		} else if (!this.state.zip) {
			this.setState({
				errorMessage: 'Please enter a ZIP code'
			})
		} else {
			const user = new User({
				username: this.state.email.toLowerCase(),
				password: this.state.password1,
				email: this.state.email,
				name: this.state.name,
				address: this.state.address,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zip,
			})
			user.save(null, {
				success: () => {
					session.authenticate({
						username: this.state.email.toLowerCase(),
						password: this.state.password1,
					}).then(() => {
						this.history.push({}, '/');
					})
				}
			});
		}
	},

	render() {
		
		const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WV', 'WI', 'WY', 'DC']

		return (
			<div className="signup-page">

				<TransitionGroup 
          transitionName='error' 
          transitionAppear={true} 
          transitionAppearTimeout={500}  
          transitionEnterTimeout={500} 
          transitionLeaveTimeout={500}
        >
          {this.state.errorMessage &&
            <Alert className='signup-error' bsStyle='danger' key={this.state.errorMessage} onDismiss={this.closeMessage}>
              {this.state.errorMessage}
            </Alert>}
        </TransitionGroup>

				<div className="signup-container">
					<h1>Signup</h1>

					<form onSubmit={this.handleSubmit}>
						<div className="signup-site-info">
							<input 
								type="text"
								className='signup-email' 
								placeholder='Email'
								value={this.state.email}
								onChange={this.handleChange.bind(this, 'email')}
							/>
							<input 
								type="password" 
								placeholder='Password'
								value={this.state.password1}
								onChange={this.handleChange.bind(this, 'password1')}
							/>
							<input 
								type="password" 
								placeholder='Confirm Password'
								value={this.state.password2}
								onChange={this.handleChange.bind(this, 'password2')}
							/>
						</div>

						<div className="signup-personal-info">
							<input 
								type="text"
								placeholder="Company Name"
								value={this.state.name}
								onChange={this.handleChange.bind(this, 'name')}
							/>
							<input 
								type="text"
								placeholder="Company Address"
								value={this.state.address}
								onChange={this.handleChange.bind(this, 'address')}
							/>
							<div className="signup-address">
								<input 
									type="text"
									placeholder="City"
									value={this.state.city}
									onChange={this.handleChange.bind(this, 'city')}
								/>
								<select name="state" value={this.state.state} onChange={this.handleChange.bind(this, 'state')}>
									<option value="" disabled>--</option>
									{states.map((state) => {
										return <option key={state} value={state}>{state}</option>
									})}
								</select>	
								<input 
									type="text"
									placeholder="ZIP Code"
									value={this.state.zip}
									onChange={this.handleChange.bind(this, 'zip')}
								/>
							</div>
						</div>

						<input type="submit" className='signup-button' value='Sign Up'/>
					</form>

					<span className="link"><Link to='/login'>Go back to log in page</Link></span>

				</div>
			</div>
		)
	}
});

export default Signup;