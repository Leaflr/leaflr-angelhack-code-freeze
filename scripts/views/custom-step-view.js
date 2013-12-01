define(['backbone','communicator'], function( Backbone, Communicator ){
	'use strict';

	return Backbone.Marionette.ItemView.extend({
		events: {
			'click .submit':'triggerNext'
		},
		triggerNext: function(){
			Communicator.events.trigger('nextStep', this.model.get('nextStep'))
		}
	});
});