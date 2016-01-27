import Backbone from 'backbone';
import Tire from './tire';

const TireCollection = Backbone.Collection.extend({
	url: 'https://api.parse.com/1/classes/Tire',
	model: Tire,

	parse(response) {
		return response.results;
	},
});

export default TireCollection;