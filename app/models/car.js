import Backbone from 'backbone'

const Car = Backbone.Model.extend({
	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/classes/Car',

	validate : (attrs, options) => {
		if (attrs.tires.length < 1) {
			return 'Must have at least one tire registered'
		}
		if (!attrs.vin && !attrs.info) {
			return 'Must have either VIN or personal information attribute to tires'
		}
	}
})

export default Car