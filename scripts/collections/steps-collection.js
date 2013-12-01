define([
	'backbone',
	'communicator',
	'models/step-model'
],
function( Backbone, Communicator, stepModel ) {
    'use strict';

	return Backbone.Collection.extend({
		model: stepModel,
		initialize: function(){
			Communicator.events.on('nextStep', function(step){

			});
		},
		compileSteps: function(){

		}
	});
});
