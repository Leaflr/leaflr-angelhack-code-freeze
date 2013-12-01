define([
	'backbone',
	'communicator',
	'views/metric-sliders-view',
	'hbs!tmpl/take-survey'],
function( Backbone, Communicator, metricSlidersView, takeSurveyTemp ){
	'use strict';

	return Backbone.Marionette.Layout.extend({
  		template: takeSurveyTemp,

    	regions: {
    	  metricSliders: "#metric-sliders",
    	  surveyStep: "#survey-step"
    	},

    	initialize: function(){
    		var metrics = this.model.get('metrics');
    		console.log(metrics)
    		this.metricSliders.show( new metricSlidersView({ collection: metrics }) );
    	}
	});
});