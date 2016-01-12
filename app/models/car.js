import Backbone from 'backbone'

const Car = Backbone.Model.extend({
	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/classes/Car',

	validate : (attrs, options) => {

		if (attrs.tires[0] == '' && attrs.tires[1] == '' && attrs.tires[2] == '' && attrs.tires[3] == '') {
			return 'Must have at least one tire registered'
		}
		if (attrs.vin == '') {
			return 'Must have either VIN or personal information attribute to tires'
		}
	}
})

export default Car