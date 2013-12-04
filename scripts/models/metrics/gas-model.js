define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.MetricModel.extend({
		defaults: {
			name: 'gas',
			value: 0,
			measurement: 'Gallons of Gas',
			type: 'minus'
		},
		initialize: function() {
      		var zipcode = '95811';
      		this.fetch({
        		url: 'data/gas_prices.php?zipcode='+zipcode,
      		});
      		this.on('change:endSurvey', this.result, this);
    	},
    	result: function(){
			console.log(this)
		}
	});
});
