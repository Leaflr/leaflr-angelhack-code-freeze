define([
	'backbone',
	'communicator',
	'views/metric-slider-view',
	'hbs!tmpl/metric-sliders'],
function( Backbone, Communicator, metricSliderView, metricSlidersTemp ){
	'use strict';

	return Backbone.Marionette.CollectionView.extend({
  		template: metricSlidersTemp,
  		className: 'metric-sliders',
  		itemView: metricSliderView
	});
});