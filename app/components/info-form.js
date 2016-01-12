import React from 'react';

const InfoForm = React.createClass({
	getInitialState() {
		return {
			name: '',
			street: '',
			city: '',
			zip: '',
		}
	},

	handleChange(state, e) {
		this.setState({
			[state]: e.target.value,
		})
	},

	render() {
		const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WV', 'WI', 'WY', 'DC']
		return (
			<div className="info-form-container">
				<p>{'(Optional) Enter Personal Information'}</p>
				<input 
					className='info-name'
					type="text"
					name='name'
					value={this.state.name}
					placeholder='Enter Name'
					onChange={this.handleChange.bind(this, 'name')}
				/>
				<input 
					className='info-street'
					type="text"
					name='street'
					value={this.state.street}
					placeholder='Enter Street Address'
					onChange={this.handleChange.bind(this, 'street')}
				/>
				<input 
					className='info-city'
					type="text"
					name='city'
					value={this.state.city}
					placeholder='Enter City'
					onChange={this.handleChange.bind(this, 'city')}
				/>
				<select name="state" defaultValue=''>
					<option value="" disabled>--</option>
					{states.map((state) => {
						return <option key={state} value={state}>{state}</option>
					})}
				</select>	
				<input 
					className="info-zip"
					type="text"
					name='zip'
					value={this.state.zip}
					placeholder='Enter ZIP'
					onChange={this.handleChange.bind(this, 'zip')}
				/>
			</div>
		)
	}
})

export default InfoForm;