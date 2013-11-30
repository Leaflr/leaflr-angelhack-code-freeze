define([
	'backbone',
	'communicator',
	'models/survey-model',
	'models/step-model',
	'models/metrics/calories-model',
	'models/metrics/oil-model',
	'models/metrics/gas-model',
	'models/metrics/emissions-model',
	'models/metrics/money-model'
],

function( Backbone, Communicator, surveyModel, stepModel, caloriesModel, oilModel, gasModel, emissionsModel, moneyModel ) {
    'use strict';

	var survey = new surveyModel({}),
		step_1 = new stepModel({ step: 1 }),
		step_2 = new stepModel({ step: 2 });

	survey.set('metrics', [ 
		new caloriesModel,
		new oilModel,
		new gasModel,
		new emissionsModel,
		new moneyModel,
	]);

	survey.set('steps', [ step_1, step_2 ]);


	console.log(survey)
	return survey;
});
