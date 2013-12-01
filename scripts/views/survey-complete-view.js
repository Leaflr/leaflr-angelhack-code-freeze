define(['backbone','hbs!tmpl/survey-complete'], function(Backbone, surveyComplete){
	'use strict';

	return Backbone.Marionette.ItemView.extend({
		template: surveyComplete
	});
});