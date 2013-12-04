define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.MetricModel.extend({
		defaults: {
			name: 'fitness',
			value: 0,
			measurement: 'Calories Burned',
			type: 'plus'
		}
	});
});
