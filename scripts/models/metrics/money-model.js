define([
	'backbone',
	'communicator',
	'associations'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.AssociatedModel.extend({
		defaults: {
			value: 0,
			name: 'money',
		}
	});
});
