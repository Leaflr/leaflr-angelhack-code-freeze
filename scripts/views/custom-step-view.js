define(['backbone','communicator'], function( Backbone, Communicator ){
	'use strict';

	return Backbone.Marionette.ItemView.extend({
		events: {
			'click .submit':'triggerNext'
		},
		initialize: function(){
			console.log(this)
		},
		triggerNext: function(){
			Communicator.events.trigger('nextStep', this.model.get('nextStep'))
		}
	});
});