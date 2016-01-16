import React from 'react';

const InfoForm = React.createClass({
	propTypes: {
		info: React.PropTypes.object.isRequired,
	},

	handleChange(state, e) {
		let info = this.props.info;
		info[state] = e.target.value;
		this.props.onChange('info', info);
	},

	render() {
		const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WV', 'WI', 'WY', 'DC']
		const info = this.props.info
		return (
			<div className="info-form-container">
				<p className="info-form-label">{'(Optional) Enter Personal Information'}</p>
				<input 
					className='info-name'
					type="text"
					name='name'
					value={info.name}
					placeholder='Enter Name'
					onChange={this.handleChange.bind(this, 'name')}
				/>
				<input 
					className='info-street'
					type="text"
					name='street'
					value={info.street}
					placeholder='Enter Street Address'
					onChange={this.handleChange.bind(this, 'street')}
				/>
				<div className="info-form-address">
					<input 
						className='info-city'
						type="text"
						name='city'
						value={info.city}
						placeholder='Enter City'
						onChange={this.handleChange.bind(this, 'city')}
					/>
					<select name="state" value={info.state} onChange={this.handleChange.bind(this, 'state')}>
						<option value="">--</option>
						{states.map((state) => {
							return <option key={state} value={state}>{state}</option>
						})}
					</select>	
					<input 
						className="info-zip"
						type="text"
						name='zip'
						value={info.zip}
						placeholder='Enter ZIP'
						onChange={this.handleChange.bind(this, 'zip')}
					/>
				</div>
			</div>
		)
	}
})

export default InfoForm;