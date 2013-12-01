define([
	'backbone',
	'communicator',
	'collections/surveys-collection',
	'views/survey-list-view',
	'interface'
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
		// list of taken surveys
		App.surveys.show( new surveyListView({ collection: surveysCollection }) );

		// start survey
		Communicator.events.on('startSurvey', function( name ){
			var survey = surveysCollection.find(function(model){
				return model.get('name') == name;
			});
		});
	});
	
	return App;
});
