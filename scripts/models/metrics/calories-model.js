define([
	'backbone',
	'communicator',
	'associations'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.AssociatedModel.extend({
		defaults: {
			name: 'calories',
			value: 0
		},
		activate: function(){
			this.set('active', true);
			return this;
		},
		addTo: function( val ){
			var oldVal = parseFloat(this.get('value')),
				newVal;

			val = parseFloat(val);
			newVal = oldVal + val;

			if (newVal > 100) newVal = 100;
			this.set('value', newVal);
			
		},
		setTo: function( val ){
			this.set('value', val);
		}
	});
});
