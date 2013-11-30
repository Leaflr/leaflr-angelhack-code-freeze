define([
	'backbone',
	'communicator',
	'associations'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.AssociatedModel.extend({
		defaults: {
			name: '',
			template: ''
		},
		onOpen: function(){},
		onSubmit: function(){}
	});
});
