define([
	'backbone',
	'communicator',
	'associations'
],
function( Backbone, Communicator ) {
    'use strict';

	return Backbone.AssociatedModel.extend({
    initialize: function() {
      this.fetch({
        url: 'data/oil_prices.php'
      });
		}
	});
});
