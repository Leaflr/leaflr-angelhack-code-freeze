define(['backbone','views/survey-complete-single-view','hbs!tmpl/survey-complete'], function(Backbone, surveyCompleteSingle, surveyComplete){
	'use strict';

	return Backbone.Marionette.CompositeView.extend({
		template: surveyComplete,
		itemView: surveyCompleteSingle,
		itemViewContainer: '.survey-results'
	});
});