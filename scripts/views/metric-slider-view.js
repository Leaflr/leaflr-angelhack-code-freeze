define([
	'backbone',
	'communicator',
	'hbs!tmpl/metric-slider'],
function( Backbone, Communicator, metricSliderTemp ){
	'use strict';

	return Backbone.Marionette.ItemView.extend({
  		className: function(){
  			var name = this.model.get('name');
  			return 'slider metric-slider-inner ' + name;
  		},
  		template: metricSliderTemp,
  		initialize: function(){
  			this.listenTo(this.model, 'change:active', this.activate);
  			this.listenTo(this.model, 'change:value', this.changeVal);
  		},
  		changeVal: function(){
  			this.$el.find('.value').width( this.model.get('value') + '%' );

  		},
  		activate: function(){
  			this.$el.removeClass('inactive');
  		}
	});
});