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
		this.state.tires.fetch({url: 'https://api.parse.com/1/classes/Tire?count=1&include=vin,dealer'}).then((res) => {
			this.setState({
				loading: false,
				loaded: true,
				count: res.count
			})
		})
	},

	showTires() {
		this.setState({
			showTires: true,
		})
	},

	render() {
		let loading = this.state.loading;
		let tires = this.state.tires.slice(0, 10);
		console.log(tires);
		return (
			<div className="db-test-container">
				<Button
					disabled={loading}
					onClick={loading ? null : this.handleClick}
				>
					{loading ? 'Loading...' : 'Fetch all data'}
				</Button>
				{this.state.count && <p>{'Count: ' + this.state.count}</p>}

				{this.state.loaded &&
					<Button onClick={this.showTires}>Show last 10 tires registered</Button>}

				{this.state.showTires &&
					<ul className="tires">
						<li className="tire">
							<p>TIN</p>
							<p>VIN</p>
							<p>Date Registered</p>
							<p>Dealer</p>
							<p>Location</p>
						</li>

						{tires.map((tire) => {
							return (
								<li className='tire'>
									<p>{tire.get('TIN')}</p>
									<p>{tire.get('vin').VIN}</p>
									<p>{tire.get('createdAt')}</p>
									<p>{tire.get('dealer').name}</p>
									<p>{`${tire.get('dealer').city}, ${tire.get('dealer').state}`}</p>
								</li>
								)
						})}
					</ul>}
			</div>
		)
	}
});

export default DBTest;