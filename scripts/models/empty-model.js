define([
	'backbone',
	'communicator',
	'associations'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.AssociatedModel.extend({
		defualts: {

		},
		relations: [
	        {
	            type: Backbone.One, 
	            key: '', 
	            relatedModel: ''
	        }
    	],
	});
});
