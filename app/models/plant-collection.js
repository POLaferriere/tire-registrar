import Backbone from 'backbone';
import Plant from './plant';

const PlantCollection = Backbone.Collection.extend({
	url: 'https://api.parse.com/1/classes/Plants',
	model: Plant,

	parse(response) {
		return response.results;
	}
})

export default PlantCollection;