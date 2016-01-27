import React from 'react';
import {Button} from 'react-bootstrap';
import store from '../store';

const DBTest = React.createClass({
	getInitialState() {
		return {
			loading: false,
		}
	},

	componentWillMount() {
		this.setState({
			tires: store.getTireCollection(),
		})
	},

	handleClick() {
		this.setState({
			loading: true,
		})
		this.state.tires.fetch({url: 'https://api.parse.com/1/classes/Tire?count=1&include=vin'}).then((res) => {
			this.setState({
				loading: false,
				count: res.count
			})
		})
	},

	render() {
		let loading = this.state.loading;
		return (
			<div className="db-test-container">
				<Button
					disabled={loading}
					onClick={loading ? null : this.handleClick}
				>
					{loading ? 'Loading...' : 'Fetch all data'}
				</Button>
				{this.state.count && <p>{'Count: ' + this.state.count}</p>}
			</div>
		)
	}
});

export default DBTest;