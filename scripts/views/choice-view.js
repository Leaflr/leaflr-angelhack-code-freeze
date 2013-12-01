define([
	'backbone',
	'communicator',
	'hbs!tmpl/choice'],
function( Backbone, Communicator, choiceTemp ){
	'use strict';

	return Backbone.Marionette.ItemView.extend({
  		template: choiceTemp,

  		events: {
  			'click':'selected'
  		},

  		selected: function(){
  			Communicator.events.trigger('nextStep', this.model);
  		}
	});
});