define([
	'backbone',
	'communicator',
	'associations'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.AssociatedModel.extend({
    initialize: function() {
      var zipcode = '95811';
      this.fetch({
        url: 'data/gas_prices.php?zipcode='+zipcode,
      });
    }
	});
});
