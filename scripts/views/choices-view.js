define([
	'backbone',
	'communicator',
	'views/choice-view',
	'hbs!tmpl/choices'],
function( Backbone, Communicator, choiceView, choicesTemp ){
	'use strict';

	return Backbone.Marionette.CompositeView.extend({
  		template: choicesTemp,
  		className: 'metric-sliders',
  		itemView: choiceView,
  		ui: {
  			stepTitle: 'h6'
  		},
  		onRender: function(){
  			var stepTitle = this.collection.parents[0].get('title');
  			this.ui.stepTitle.text( stepTitle );
  		}
	});
});