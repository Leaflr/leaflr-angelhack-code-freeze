define([
	'backbone',
	'communicator',
	'hbs!tmpl/choice'],
function( Backbone, Communicator, choiceTemp ){
	'use strict';

	return Backbone.Marionette.ItemView.extend({
  		template: choiceTemp,
      className: 'choice',

  		events: {
  			'click':'selected'
  		},

  		selected: function(){
  			Communicator.events.trigger('nextStep', this.model.get('nextStep') );

  			if (this.model.get('onSelect'))
  			this.model.attributes.onSelect();
  		}
	});
});