define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.MetricModel.extend({
		defaults: {
			name: 'oil',
			value: 0,
			measurement: 'Barrels of Oil',
			type: 'minus'
		},
		initialize: function(){
		      this.fetch({
		        url: 'data/oil_prices.php'
		      });
		},
	});
});
