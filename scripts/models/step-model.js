define([
	'backbone',
	'communicator',
	'models/choices-model',
	'associations'
],
function( Backbone, Communicator, choicesModel ) {
    'use strict';

	return Backbone.AssociatedModel.extend({
		defaults: {
			name: '',
			template: ''
		},
		relations: [
	        {
	            type: Backbone.Many, 
	            key: 'choices', 
	            relatedModel: choicesModel
	        }
    	]
	});
});
