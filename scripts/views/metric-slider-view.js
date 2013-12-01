define([
	'backbone',
	'communicator',
	'hbs!tmpl/metric-slider'],
function( Backbone, Communicator, metricSliderTemp ){
	'use strict';

	return Backbone.Marionette.ItemView.extend({
  		className: 'slider metric-slider-inner',
  		template: metricSliderTemp,
	});
});