import React from 'react';
import Icon from 'react-fa';

const TINForm = React.createClass({
	getInitialState() {
		return {
			tin1: '',
			tin2: '',
			tin3: '',
			tin4: '',
			tin1Check: null,
			tin2Check: null,
			tin3Check: null,
			tin4Check: null,
		}
	},

	handleChange(tin, e) {
		this.setState({
			[tin]: e.target.value
		})
		tin = tin + 'Check'
		if (/^[a-z0-9]{4}\s?[a-z0-9]{3}\s?[a-z0-9]{4}$/.test(e.target.value)) {
			this.setState({
				[tin]: true,
			})
		} else {
			this.setState({
				[tin]: false,
			})
		}
	},


	render() {
		return (
			<div className="tin-form-container">
				<p>Enter or Scan Tire Identification Numbers (TINs)</p>
				<div className="tire1">
					<input 
						className='tin tin1'
						name='tin1' 
						type="text" 
						value={this.state.tin1}
						onChange={this.handleChange.bind(this, 'tin1')}
						placeholder='Tire 1'
					/>
					{this.state.tin1Check && 
						<Icon name='check'/>}
					{this.state.tin1 != '' && !this.state.tin1Check &&
						<Icon name='times'/>}
				</div>
				<div className="tire2">
					<input 
						className='tin tin2' 
						type="text" 
						name='tin2'
						value={this.state.tin2}
						onChange={this.handleChange.bind(this, 'tin2')}
						placeholder='Tire 2'
					/>
					{this.state.tin2Check && 
						<Icon name='check'/>}
					{this.state.tin2 != '' && !this.state.tin2Check &&
						<Icon name='times'/>}
				</div>
				<div className="tire3">
					<input 
						className='tin tin3' 
						type="text"
						name='tin3'
						value={this.state.tin3}
						onChange={this.handleChange.bind(this, 'tin3')}
						placeholder='Tire 3'
					/>
					{this.state.tin3Check && 
						<Icon name='check'/>}
					{this.state.tin3 != '' && !this.state.tin3Check &&
						<Icon name='times'/>}
				</div>
				<div className="tire4">
					<input 
						className='tin tin4' 
						type="text" 
						name='tin4'
						value={this.state.tin4}
						onChange={this.handleChange.bind(this, 'tin4')}
						placeholder='Tire 4'
					/>
					{this.state.tin4Check && 
						<Icon name='check'/>}
					{this.state.tin4 != '' && !this.state.tin4Check &&
						<Icon name='times'/>}
				</div>
			</div>
		)
	}
})

export default TINForm