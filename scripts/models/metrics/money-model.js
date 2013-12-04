define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.MetricModel.extend({
		defaults: {
			name: 'money',
			value: 0,
			measurement: 'Dollars Saved',
			type: 'plus'
		}
	});
});
