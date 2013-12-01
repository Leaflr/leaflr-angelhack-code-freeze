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

	var survey = new surveyModel({ name: 'bike', category: 'transit', completed: true }),
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


	/////////////////////////////
	// 	STEP 1
	/////////////////////////////

	
	step_1.choices = [
		{
			name: 'sedan',
			iconClass: 'sedan',
			icon: 'sedan.svg'
		},
		{
			name: 'suv',
			iconClass: 'sedan',
			icon: 'suv.svg'
		},
		{
			name: 'truck',
			iconClass: 'sedan',
			icon: 'sedan.svg'
		},
		{
			name: 'specific',
			iconClass: 'sedan',
			icon: 'specific.svg'
		}
	];

	step_1.onSubmit = function(){

	}
	console.log(survey)
	return survey;
});
