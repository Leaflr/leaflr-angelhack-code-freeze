define([
	'backbone',
	'communicator',
	'models/step-model',
	'models/metric-model',
	'collections/steps-collection',
	'associations'
],
function( Backbone, Communicator, stepModel, metricModel, stepsCollection ) {
    'use strict';

	return Backbone.AssociatedModel.extend({
		initialize: function(){

		},
		defaults: {
			name: '',
		},
		relations: [
	      {
	        type: Backbone.Many,//nature of the relation
	        key: 'steps', //attribute of Project
	        relatedModel: stepModel, //Optional
	        collectionType: stepsCollection
	      },
	      {
	        type: Backbone.Many,//nature of the relation
	        key: 'metrics', //attribute of Project
	        relatedModel: metricModel //Optional
	      }
  		],
	});
});
