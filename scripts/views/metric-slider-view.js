define([
	'backbone',
	'communicator',
	'hbs!tmpl/metric-slider'],
function( Backbone, Communicator, metricSliderTemp ){
	'use strict';

	return Backbone.Marionette.ItemView.extend({
  		className: 'slider metric-slider-inner',
  		template: metricSliderTemp,
  		initialize: function(){
  			this.listenTo(this.model, 'change:active', this.activate);
  			this.listenTo(this.model, 'change:value', this.changeVal);
  		},
  		changeVal: function(){
  			// animate slider
  		},
  		activate: function(){
  			this.$el.removeClass('inactive');
  		}
	});
});