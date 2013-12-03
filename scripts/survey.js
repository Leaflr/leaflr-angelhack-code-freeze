define([
	'backbone',
	'communicator',
	'models/survey-model',
	'models/step-model',
	'models/choices-model',
	'models/metrics/gas-model',
	'models/metrics/emissions-model',
	'models/metrics/money-model',
  'hbs!tmpl/custom-step-vehicle'
],

function( Backbone, Communicator, surveyModel, stepModel, choicesModel, gasModel, emissionsModel, moneyModel, specificVehicleTemp) {
    'use strict';

	var survey = new surveyModel({ name: 'bike', category: 'transit', completed: true }),
		vehicleType       = new stepModel({ step: 'vehicle type' }),
		fuelType          = new stepModel({ step: 'fuel type' }),
    roadType          = new stepModel({ step: 'road type' }),
    distanceTraveled  = new stepModel({ step: 'distance traveled' }),
		specificDistance  = new stepModel({ step: 'specific distance' }),
		specificVehicle   = new stepModel({ step: 'specific vehicle' }),
		userLocation      = new stepModel({ step: 'location' }),
    tripFrequency     = new stepModel({ step: 'specific frequency' }),
    foo               = new stepModel({ step: 'foo' }),
		gas               = new gasModel,
		emissions         = new emissionsModel,
		money             = new moneyModel

	survey.set('metrics', [ gas, emissions, money ]);

	survey.set('steps', [
    vehicleType,
    fuelType,
    roadType,
    distanceTraveled,
    specificDistance,
    specificVehicle,
    userLocation,
    tripFrequency
  ]);

  survey.results = {};
  survey.results.vehicle_nonspec = 0;

	/////////////////////////////
	// 	STEP 1
	/////////////////////////////

  /* Vehicle Type
   * ============ */	
	vehicleType.set('choices', [
		new choicesModel({
			name: 'sedan',
			iconClass: 'sedan',
			icon: 'sedan.svg',
			nextStep: fuelType,
			onSelect: function(){
        survey.results.carvid = 17760;
        $.ajax({
          url: 'data/vehicle.php?vid=17760',
          success: function(data) {
            data = eval('('+data+')');

            console.log('FULL', data);
            survey.results.vehicle_nonspec = 1;
            survey.results.carmpghwy  = data.highway08;
            survey.results.carmpgcity = data.city08;
            survey.results.carco2      = data.co2TailpipeGpm;

          }
        });

				gas.activate().addTo(20);
        money.activate().addTo(10);
        emissions.activate().addTo(5);
			}
		}),
		new choicesModel({
			name: 'suv',
			iconClass: 'suv',
			icon: 'suv.svg',
			nextStep: fuelType,
      onSelect: function() {
        survey.results.carvid = 18068;
        $.ajax({
          url: 'data/vehicle.php?vid=18068',
          success: function(data) {
            data = eval('('+data+')');

            console.log('FULL', data);
            survey.results.vehicle_nonspec = 1;
            survey.results.carmpghwy  = data.highway08;
            survey.results.carmpgcity = data.city08;
            survey.results.carco2      = data.co2TailpipeGpm;
          }
        });

        gas.activate().addTo(60);
        money.activate().addTo(12);
        emissions.activate().addTo(15);
      }
		}),
		new choicesModel({
			name: 'truck',
			iconClass: 'truck',
			icon: 'truck.svg',
			nextStep: fuelType,
      onSelect: function() {
        survey.results.carvid = 17893;
        $.ajax({
          url: 'data/vehicle.php?vid=17893',
          success: function(data) {
            data = eval('('+data+')');

            console.log('FULL', data);
            self.model.collection.parents[0].results.vehicle_nonspec = 1;
            survey.results.carmpghwy  = data.highway08;
            survey.results.carmpgcity = data.city08;
            survey.results.carco2      = data.co2TailpipeGpm;

          }
        });

        gas.activate().addTo(40);
        money.activate().addTo(40);
        emissions.activate().addTo(10);

      }
		}),
		new choicesModel({
			name: 'specific',
			iconClass: 'sedan',
			icon: 'specifcVehicle.svg',
			nextStep: specificVehicle
		}),
	]);

  specificVehicle.set({
    template: specificVehicleTemp,
    nextStep: fuelType, 
  });

  /* Fuel Type
   * ========= */
	fuelType.set('choices', [
		new choicesModel({
			name: 'gas',
			iconClass: 'gas',
			icon: 'gas.svg',
      nextStep: userLocation,
      onSelect: function() {
        survey.results.carfueltype = this.name;

        gas.activate().addTo(20);
        money.activate().addTo(20);
        emissions.activate().addTo(7);
      }
		}),
		new choicesModel({
			name: 'electric',
			iconClass: 'electric',
			icon: 'electric.svg',
      nextStep: userLocation,
      onSelect: function() {
        survey.results.carfueltype = this.name;

        gas.activate().addTo(5);
        money.activate().addTo(5);
        emissions.activate().addTo(0);
      }
		}),
		new choicesModel({
			name: 'Diesel',
			iconClass: 'diesel',
			icon: 'diesel.svg',
      nextStep: userLocation,
      onSelect: function() {
        survey.results.carfueltype = this.name;

        gas.activate().addTo(40);
        money.activate().addTo(40);
        emissions.activate().addTo(30);
      }
		}),
		new choicesModel({
			name: 'hybrid',
			iconClass: 'hybrid',
			icon: 'hybrid.svg',
      nextStep: specificDistance,
		}),
	]);

  /* Location
   * ======== */
  userLocation.set('choices', [
    new choicesModel({
      name: 'Get Location',
      iconClass: 'geocode',
      icon: 'geocode.svg',
      nextStep: distanceTraveled,
      onSelect: function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(pos) {
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            survey.results.loc = lat+','+lng;
            survey.results.zip = '95811';
            /* Grab zipcode from google api
             * ============================ */
             /*
             // Do this later...
            $.ajax({
              url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true',
              type: 'GET',
              async: true,
              success: function(data) {
                console.log('google results', data);  
                  survey.results.loc = data.results.address_components[8].postal_code;

              }
            });
            */
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }
    }),
    new choicesModel({
      name: 'Enter Zipcode',
      iconClass: 'zipcode',
      icon: 'zipcode.svg',
      nextStep: distanceTraveled,
      onSelect: function() {
        survey.results.loc = this.name;
      }
    }),
  ]);

  /* Distance Traveled
   * ================= */
  distanceTraveled.set('choices', [
    new choicesModel({
      name: '0-5',
      iconClass: '0-5',
      icon: '0-5.svg',
      nextStep: roadType,
      onSelect: function() {
        survey.results.tripdistance = 3;

        gas.activate().addTo(10);
        money.activate().addTo(5);
        emissions.activate().addTo(5);
      }
    }),
    new choicesModel({
      name: '6-9',
      iconClass: '5-10',
      icon: '6-9.svg',
      nextStep: roadType,
      onSelect: function() {
        survey.results.tripdistance = 7;

        gas.activate().addTo(13);
        money.activate().addTo(10);
        emissions.activate().addTo(10);
      }
    }),
    new choicesModel({
      name: '10',
      iconClass: '10',
      icon: '10.svg',
      nextStep: roadType,
      onSelect: function() {
        survey.results.tripdistance = 13;

        gas.activate().addTo(15);
        money.activate().addTo(15);
        emissions.activate().addTo(15);
      }
    }),
    new choicesModel({
      name: 'Specific',
      iconClass: 'specificDistance',
      icon: 'specificDistance.svg',
      nextStep: roadType,
    })
  ]);

  /* Road Type
   * ========= */
  roadType.set('choices', [
    new choicesModel({
      name: 'Mostly Highway',
      iconClass: 'mostlyHighway',
      icon: 'mostlyHighway.svg',
      nextStep: tripFrequency,
      onSelect: function() {
        survey.results.hwyper = 80;

          gas.activate().addTo(40);
          money.activate().addTo(40);
          emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: 'Equal Highway / City',
      iconClass: 'equalRoad',
      icon: 'equalRoad.svg',
      nextStep: tripFrequency,
      onSelect: function() {
        survey.results.hwyper = 50;

          gas.activate().addTo(40);
          money.activate().addTo(40);
          emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: 'Mostly City',
      iconClass: 'mostlyCity',
      icon: 'mostlyCity.svg',
      nextStep: tripFrequency,
      onSelect: function() {
        survey.results.hwyper = 80;

          gas.activate().addTo(40);
          money.activate().addTo(40);
          emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: 'Specific',
      iconClass: 'specificRoad',
      icon: 'specificRoad.svg',
      nextStep: tripFrequency
    }),
  ]);


  /* Trip Frequency (how often ride bike)
   * ==================================== */
  tripFrequency.set('choices', [
    new choicesModel({
      name: '1 day a week',
      iconClass: '1-day',
      icon: '1-day.svg',
      nextStep: 'end',
      onSelect: function() {
        survey.results.freq = 1;

        gas.activate().addTo(40);
        money.activate().addTo(40);
        emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: '3 days a week',
      iconClass: '3-day',
      icon: '3-day.svg',
      nextStep: 'end',
      onSelect: function() {
        survey.results.freq = 3;

        gas.activate().addTo(20);
        money.activate().addTo(20);
        emissions.activate().addTo(20);
      }
    }),
    new choicesModel({
      name: '5 days a week',
      iconClass: '5-day',
      icon: '5-day.svg',
      nextStep: 'end',
      onSelect: function() {
        survey.results.freq = 5;

        gas.activate().addTo(40);
        money.activate().addTo(40);
        emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: 'Specific',
      iconClass: 'specificDays',
      icon: 'specificDays.svg',
      nextStep: 'end'
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
