import Backbone from 'backbone';

const Tire = Backbone.Model.extend({
	urlRoot: 'https://api.parse.com/1/classes/Tire',
	idAttribute: 'objectId',

	
});

export default Tire;