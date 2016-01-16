import React from 'react';
import Icon from 'react-fa';
import $ from 'jquery';
import _ from 'underscore';
import TransitionGroup from 'react-addons-css-transition-group';
import {Button} from 'react-bootstrap';
import store from '../store';


const TIN = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		tire: React.PropTypes.array.isRequired,
	},

	getInitialState() {
		return {
			tin: this.props,
			plantInfo: false,
			dateInfo: false,
			plantError: false,
		}
	},

	componentDidMount() {
		let plants = store.getPlantCollection();
		plants.fetch().then(() => {this.setState({plants: plants}), console.log(plants)})
	},

	handleChange(i, e) {
		let tin = this.props.tire;
		tin[i] = e.target.value
		this.props.onChange(tin)

		let tire = this.props.tire
		
		if (/^[a-z0-9]{4}$/ig.test(tire[0]) && /^[a-z0-9]{3,5}$/ig.test(tire[1]) && /^[0-9]{4}$/ig.test(tire[2])) {
			this.setState({
				check: true,
			});
		} else {
			this.setState({
				check: false,
			})
		}

		if (/^[a-z0-9]{4}$/ig.test(tire[0])) {
			let plant = this.state.plants.find((plant) => {return plant.get('plantCode') == tire[0].slice(0,2).toLowerCase()})
			console.log(tire[0].slice(0,2).toLowerCase())
			if(_.isUndefined(plant)) {
				this.setState({
					plantInfo: true,
					plantError: true,
				})
			} else {
				this.setState({
					plantInfo: true,
					plant: plant,
				})
			}
		} else {
			this.setState({
				plantInfo: false,
			})
		}

		if (/^[0-9]{4}$/ig.test(tire[2])) {
			this.setState({
				dateInfo: true,
				week: tire[2].slice(0,2),
				year: tire[2].slice(2,4),
			})
		} else {
			this.setState({
				dateInfo: false,
			})
		}
	},

	checkStartInput(e) {
		if(e.target.value.length == 4) {
			$('.' + this.props.name + '-middle').focus()
		}
	},

	checkMidInput(e) {
		if(e.target.value.length == 5) {
			$('.' + this.props.name + '-end').focus()
		}
	},

	getTireInfo() {
		this.setState({
			infoCheck: true,
		})
		$.ajax({
			method: 'GET',
			url: 'https://api.parse.com/1/classes/Type',
		}).then(() => {
			this.setState({infoCheck: false})
			this.props.showInfo(this.state.value);
		})
	},

	render() {
		let plant = this.state.plant && this.state.plant.toJSON();
		return(
			<div className={'tin ' + this.props.name}>
				<div className="tin-container">
					<input 
						className={'tin-start ' + this.props.name + '-start'}
						name={this.props.name} 
						type="text" 
						value={this.props.tire[0]}
						maxLength={4}
						onChange={this.handleChange.bind(this, 0)}
						onKeyUp={this.checkStartInput}
					/>
					<input 
						className={'tin-middle ' + this.props.name + '-middle'}
						name={this.props.name} 
						type="text" 
						value={this.props.tire[1]}
						maxLength={5}
						onChange={this.handleChange.bind(this, 1)}
						onKeyUp={this.checkMidInput}
					/>
					<input 
						className={'tin-end ' + this.props.name + '-end'}
						name={this.props.name} 
						type="text" 
						value={this.props.tire[2]}
						maxLength={4}
						onChange={this.handleChange.bind(this, 2)}
					/>
				</div>
				{this.state.check && 
					<Icon className='check' name='check'/>}
				{this.props.tire != '' && !this.state.check &&
					<Icon className='times' name='times'/>}

				<TransitionGroup 
					component='div' 
					className='manufacture-info' 
					transitionName='info' 
					transitionEnterTimeout={500} 
					transitionLeaveTimeout={500}
				>
					{this.state.plantInfo &&
						<div className="plant-info">
							{!this.state.plantError &&
								<div className='plant-info-container'>
									<p>{plant.plantName}</p>
									<p>{plant.city}</p>
									<p>{plant.country}</p>
								</div>}
							{this.state.plantError &&
								<p>Plant not found</p>}
						</div>}
					{this.state.dateInfo &&
							<div className="date-info">
							<p>{'Manufactured: '}</p>
							<p>{'Week '+ this.state.week + ' of 20' + this.state.year}</p>
						</div>}
				</TransitionGroup>

			</div>
		)
	}
});

export default TIN;