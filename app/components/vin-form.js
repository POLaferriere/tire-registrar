import React from 'react';
import Icon from 'react-fa';

const VINForm = React.createClass({
	propTypes: {
		vin: React.PropTypes.string.isRequired,
	},

	getInitialState() {
		return {
			vinCheck: null
		}
	},

	handleChange(e) {
		let vin = e.target.value.toUpperCase();
		this.props.onChange('vin', vin);
		if (vin.length != 17) {
			this.setState({
				vinCheck: false,
			})
		} else {
			let checkNum = vin.charAt(8);
			if (typeof(checkNum) == 'string') {
				checkNum = checkNum.toUpperCase()
			};
			let vinDecoded = vin.replace(checkNum, '')
				.replace(/a/ig, 1).replace(/b/ig, 2).replace(/c/ig, 3).replace(/d/ig, 4).replace(/e/ig, 5)
				.replace(/f/ig, 6).replace(/g/ig, 7).replace(/h/ig, 8).replace(/j/ig, 1).replace(/k/ig, 2)
				.replace(/l/ig, 3).replace(/m/ig, 4).replace(/n/ig, 5).replace(/p/ig, 7).replace(/r/ig, 9)
				.replace(/s/ig, 2).replace(/t/ig, 3).replace(/u/ig, 4).replace(/v/ig, 5).replace(/w/ig, 6)
				.replace(/x/ig, 7).replace(/y/ig, 8).replace(/z/ig, 9)
			vinDecoded = vinDecoded.split('');
			vinDecoded[0] *= 8;
			vinDecoded[1] *= 7;
			vinDecoded[2] *= 6;
			vinDecoded[3] *= 5;
			vinDecoded[4] *= 4;
			vinDecoded[5] *= 3;
			vinDecoded[6] *= 2;
			vinDecoded[7] *= 10;
			vinDecoded[8] *= 9;
			vinDecoded[9] *= 8;
			vinDecoded[10] *= 7;
			vinDecoded[11] *= 6;
			vinDecoded[12] *= 5;
			vinDecoded[13] *= 4;
			vinDecoded[14] *= 3;
			vinDecoded[15] *= 2;
			const sum = vinDecoded.reduce((a, b) => {return a + b});
			let calcCheck = sum % 11;
			if (calcCheck == 10) {
				calcCheck = 'X'
			}
			if (calcCheck == checkNum) {
				this.setState({
					vinCheck: true,
				})
			}
		}
	},

	render() {
		return (
			<div className="vin-form-container">
				<p className='vin-form-label'>Enter or Scan Vehicle Identification Number (VIN)</p>
				<div className="vin">
					<input 
						type="text" 
						name='vin'
						value={this.props.vin} 
						onChange={this.handleChange}
						placeholder='VIN'
					/>
					{this.state.vinCheck && 
						<Icon name='check'/>}
					{this.props.vin != '' && !this.state.vinCheck && 
						<Icon name='times'/>}
				</div>
			</div>
		)
	}
})

export default VINForm;