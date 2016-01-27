import Backbone from 'backbone';
import VIN from './vin';

const VinCollection = Backbone.Collection.extend({
	url: 'https://api.parse.com/1/classes/VIN',
	model: VIN,

	parse(response) {
		return response.results;
	},
});

export default VinCollection;