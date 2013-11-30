define([
	'backbone',
	'communicator',
	'models/step-model',
	'models/metric-model',
	'associations'
],
function( Backbone, Communicator, stepModel, metricModel ) {
    'use strict';

	return Backbone.AssociatedModel.extend({
		defaults: {
			name: '',
		},
		relations: [
	      {
	        type: Backbone.Many,//nature of the relation
	        key: 'steps', //attribute of Project
	        relatedModel: stepModel //Optional
	      },
	      {
	        type: Backbone.Many,//nature of the relation
	        key: 'metrics', //attribute of Project
	        relatedModel: metricModel //Optional
	      }
  		],
	});
});
