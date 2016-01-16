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

				{/*<TIN name='tin1' tire={1} showInfo={this.props.showInfo}/>
				<TIN name='tin2' tire={2} showInfo={this.props.showInfo}/>
				<TIN name='tin3' tire={3} showInfo={this.props.showInfo}/>
				<TIN name='tin4' tire={4} showInfo={this.props.showInfo}/> */}

			</div>
		)
	}
})

export default TINForm