import Backbone from 'backbone';

const Plant = Backbone.Model.extend({
	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/classes/Plants'
})

export default Plant;