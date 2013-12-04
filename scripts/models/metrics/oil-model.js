define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';
console.log(Backbone)
	return Backbone.MetricModel.extend({
		defaults: {
			name: 'oil'
		},
		initialize: function(){
		      this.fetch({
		        url: 'data/oil_prices.php'
		      });
		},
	});
});
