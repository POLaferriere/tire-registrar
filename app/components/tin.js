import React from 'react';
import Icon from 'react-fa';
import $ from 'jquery';
import TransitionGroup from 'react-addons-css-transition-group';
import {Button} from 'react-bootstrap';


const TIN = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		tire: React.PropTypes.number.isRequired,
	},

	getInitialState() {
		return {
			value: '',
			check: false,
			infoCheck: false,
			info: false,
			infoButton: false,
		}
	},

	handleChange(e) {
		this.setState({
			value: e.target.value
		})
		if (/^[a-z0-9]{4}\s?[a-z0-9]{3}\s?[a-z0-9]{4}$/.test(e.target.value)) {
			this.setState({
				check: true,
				infoButton: true,
			});
		} else {
			this.setState({
				check: false,
				infoButton: false,
			})
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
		return(
			<div className={this.props.name}>
				<input 
					className={'tin ' + this.props.name}
					name={this.props.name} 
					type="text" 
					value={this.state.value}
					onChange={this.handleChange}
					placeholder={'Tire ' + this.props.tire}
				/>
				{this.state.check && 
					<Icon name='check'/>}
				{this.state.value != '' && !this.state.check &&
					<Icon name='times'/>}
				<TransitionGroup transitionName='check' transitionEnterTimeout={200} transitionLeaveTimeout={1}>
					{this.state.infoButton &&
						<Button className='tire-info' bsStyle='primary' disabled={this.state.infoCheck} onClick={this.getTireInfo}>
							{this.state.infoCheck ? 'Retrieving' : 'Click here to get tire information'}
						</Button>}
				</TransitionGroup>
			</div>
		)
	}
});

export default TIN;