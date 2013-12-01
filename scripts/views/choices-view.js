define([
	'backbone',
	'communicator',
	'views/choice-view',
	'hbs!tmpl/choices'],
function( Backbone, Communicator, choiceView, choicesTemp ){
	'use strict';

	return Backbone.Marionette.CollectionView.extend({
  		template: choicesTemp,
  		className: 'metric-sliders',
  		itemView: choiceView
	});
});