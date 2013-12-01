define([
	'backbone',
	'communicator',
	'collections/surveys-collection',
	'views/survey-list-view',
	'views/take-survey',
	'interface'
],

function( Backbone, Communicator, surveysCollection, surveyListView, takeSurvey ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		surveys: '#survey-list',
		takeSurvey: '#take-survey'
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
			App.takeSurvey.show( new takeSurvey({ model: survey }) );
		});
	});
	
	return App;
});
