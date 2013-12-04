define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	Backbone.MetricModel = Backbone.Model.extend({
		defaults: {
			name: '',
			value: 0,
			min: 0,
			max: 100,
		},
		add: function( val ){
			var oldVal = parseFloat(this.get('value')),
				newVal;

			val = parseFloat(val);
			newVal = oldVal + val;

			if (newVal > 100) newVal = 100;
			this.set('value', newVal);
		},
		subtract: function( val ){
			var oldVal = parseFloat(this.get('value')),
				newVal;

			val = parseFloat(val);
			newVal = oldVal - val;

			if (newVal > 100) newVal = 100;
			else if (newVal > 0) newVal = 0;

			this.set('value', newVal);
		}
	});
});
