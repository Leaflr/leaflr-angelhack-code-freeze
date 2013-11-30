define([
	'backbone',
	'communicator',
	'collections/surveys-collection',
	'views/survey-list-view'
],

function( Backbone, Communicator, surveysCollection, surveyListView ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		surveys: '#survey-list'
	});

	/* Add initializers here */
	App.addInitializer( function () {
		App.surveys.show( new surveyListView({ collection: surveysCollection }) );
	});
	
	return App;
});
