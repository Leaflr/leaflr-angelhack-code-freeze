define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.MetricModel.extend({
		defaults: {
			name: 'emissions',
			value: 0,
			measurement: 'CO² ppm',
			type: 'minus'
		}
	});
});
