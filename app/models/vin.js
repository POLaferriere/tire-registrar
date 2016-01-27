import Backbone from 'backbone';

const VIN = Backbone.Model.extend({
	urlRoot: 'https://api.parse.com/1/classes/VIN',
	idAttribute: 'objectId',
});

export default VIN;