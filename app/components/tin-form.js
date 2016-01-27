import React from 'react';

import TIN from './tin';

const TINForm = React.createClass({
	propTypes: {
		showInfo: React.PropTypes.func.isRequired,
		tires: React.PropTypes.array.isRequired,
	},

	onChange(i, e) {
		let tires = this.props.tires;
		tires[i] = e;
		this.props.onChange('tires', tires);
	},

	render() {
		return (
			<div className="tin-form-container">

				<p className='tin-form-label'>Enter or Scan Tire Identification Numbers (TINs)</p>

				{this.props.tires.map((tire, i) => {
					return (
						<TIN 
							key={i} 
							name={'tin' + (i + 1)} 
							tire={tire} 
							showInfo={this.props.showInfo} 
							onChange={this.onChange.bind(this, i)}
						/>)
				})}

			</div>
		)
	}
})

export default TINForm