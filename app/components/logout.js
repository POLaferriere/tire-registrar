import React from 'react';
import {Button} from 'react-bootstrap';
import {History} from 'react-router';

const Logout = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			loggedOut: false,
		}
	},

	goBack() {
		this.history.goBack();
	},

	logout() {
		session.invalidate();
		this.setState({
			loggedOut: true,
		})
		setTimeout(() => {this.history.pushState({}, '/')}, 5000)
	},

	render() {
		return (
			<div className="logout-container">
				
				{!this.state.loggedOut &&
					<div>
						<h2>Are you sure you want to log out?</h2>
						<div className="logout-buttons">
							<Button bsStyle='warning' onClick={this.logout}>Log Out</Button>
							<Button onClick={this.goBack}>Go Back</Button>
						</div>
					</div>}

				
				{this.state.loggedOut &&
					<h2>You have been logged out</h2>
				}
			</div>
		)
	}
})

export default Logout;