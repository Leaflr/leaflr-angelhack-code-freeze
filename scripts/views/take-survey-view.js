define([
	'backbone',
	'communicator',
	'!hbs/tmpl/take-survey'],
function( Backbone, Communicator, takeSurveyTemp ){
	'use strict';

	return Backbone.Marionette.Layout.extend({
  		template: takeSurveyTemp,

    	regions: {
    	  metricSliders: "#metric-sliders",
    	  surveyStep: "#survey-step"
    	}
	});
});