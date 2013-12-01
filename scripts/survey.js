define([
	'backbone',
	'communicator',
	'models/survey-model',
	'models/step-model',
	'models/choices-model',
	'models/metrics/calories-model',
	'models/metrics/oil-model',
	'models/metrics/gas-model',
	'models/metrics/emissions-model',
	'models/metrics/money-model'
],

function( Backbone, Communicator, surveyModel, stepModel, choicesModel, caloriesModel, oilModel, gasModel, emissionsModel, moneyModel ) {
    'use strict';

	var survey = new surveyModel({ name: 'bike', category: 'transit', completed: true }),
		vehicleType = new stepModel({ step: 'vehicle type' }),
		fuelType = new stepModel({ step: 'fuel type' }),
    distanceTraveled  = new stepModel({ step: 'distance traveled' }),
		specificDistance  = new stepModel({ step: 'specific distance' }),
		specificVehicle = new stepModel({ step: 'specific vehicle' }),
		oil = new oilModel,
		gas = new gasModel,
		emissions = new emissionsModel,
		money = new moneyModel,
		calories = new caloriesModel;

	survey.set('metrics', [ oil, gas, emissions, money, calories ]);

	survey.set('steps', [ vehicleType, fuelType, specificVehicle ]);


	/////////////////////////////
	// 	STEP 1
	/////////////////////////////

	
	vehicleType.set('choices', [
		new choicesModel({
			name: 'sedan',
			iconClass: 'sedan',
			icon: 'sedan-01.svg',
			nextStep: fuelType,
			onSelect: function(){
				oil.activate().addTo(20);
        money.activate().addTo(10);
        emissions.activate().addTo(20);
			}
		}),
		new choicesModel({
			name: 'suv',
			iconClass: 'sedan',
			icon: 'sedan-01.svg',
			nextStep: fuelType,
      onSelect: function() {
        oil.activate().addTo(60);
        money.activate().addTo(60);
        emissions.activate().addTo(60);
      }
		}),
		new choicesModel({
			name: 'truck',
			iconClass: 'sedan',
			icon: 'sedan-01.svg',
			nextStep: fuelType,
      onSelect: function() {
        oil.activate().addTo(40);
        money.activate().addTo(40);
        emissions.activate().addTo(40);
      }
		}),
		new choicesModel({
			name: 'specific',
			iconClass: 'sedan',
			icon: 'sedan-01.svg',
			nextStep: specificVehicle
		}),
	]);

	fuelType.set('choices', [
		new choicesModel({
			name: 'gas',
			iconClass: 'sedan',
			icon: 'sedan-01.svg',
      nextStep: distanceTraveled,
      onSelect: function() {
        oil.activate().addTo(20);
        money.activate().addTo(20);
        emissions.activate().addTo(20);
      }
		}),
		new choicesModel({
			name: 'electric',
			iconClass: 'sedan',
			icon: 'sedan-01.svg',
      nextStep: distanceTraveled,
      onSelect: function() {
        oil.activate().addTo(5);
        money.activate().addTo(5);
        emissions.activate().addTo(0);
      }
		}),
		new choicesModel({
			name: 'deisel',
			iconClass: 'sedan',
			icon: 'sedan-01.svg',
      nextStep: distanceTraveled,
      onSelect: function() {
        oil.activate().addTo(40);
        money.activate().addTo(40);
        emissions.activate().addTo(40);
      }
		}),
		new choicesModel({
			name: 'hybrid',
			iconClass: 'sedan',
			icon: 'sedan-01.svg',
      nextStep: specificDistance,
		}),
	]);



	// specificVehicle.set('choices', [
	// 	new choicesModel({
	// 		name: 'vehicle',
	// 		customView: '',
	// 		nextStep: ''
	// 	})
	// ]);

	
	console.log(fuelType)
	return survey;
});
