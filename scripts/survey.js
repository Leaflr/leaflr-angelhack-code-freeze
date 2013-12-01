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
		vehicleType = new stepModel({ step: 'vehicle type' }),
		fuelType = new stepModel({ step: 'fuel type' });

	survey.set('metrics', [ 
		new caloriesModel,
		new oilModel,
		new gasModel,
		new emissionsModel,
		new moneyModel,
	]);

	survey.set('steps', [ vehicleType, fuelType ]);


	/////////////////////////////
	// 	STEP 1
	/////////////////////////////

	
	vehicleType.set('choices', [
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
	]);

	fuelType.set('choices', [
		{
			name: 'gas',
			iconClass: 'gas',
			icon: 'gas.svg'
		},
		{
			name: 'electric',
			iconClass: 'electric',
			icon: 'electric.svg'
		},
		{
			name: 'deisel',
			iconClass: 'deisel',
			icon: 'deisel.svg'
		},
		{
			name: 'hybrid',
			iconClass: 'hybrid',
			icon: 'hybrid.svg'
		}
	]);

	
	console.log(survey)
	return survey;
});
