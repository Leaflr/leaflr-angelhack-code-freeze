define([
	'backbone',
	'communicator',
	'views/metric-sliders-view',
	'views/choices-view',
    'views/custom-step-view',
	'hbs!tmpl/take-survey',
  'hbs!tmpl/survey-complete',
    'handlebars',],
function( Backbone, Communicator, metricSlidersView, choicesView, customStepView, takeSurveyTemp, surveyComplete, Handlebars ){
	'use strict';

	return Backbone.Marionette.Layout.extend({
  		template: takeSurveyTemp,

  		events: {
  			
  		},

    	regions: {
    	  metricSliders: "#metric-sliders",
    	  surveyStep: "#survey-step"
    	},

    	initialize: function(){
    		var self = this;

            // event is fired when a choice is clicked
    		Communicator.events.on('nextStep', function(model){
    			if ( model == 'end' ) self.endSurvey();
                else self.compileStep( model );
    		});
    	},

    	onRender: function(){
    		var metrics = this.model.get('metrics');
			
			// initialize metric sliders
    		this.metricSliders.show( new metricSlidersView({ collection: metrics }) );

    		// compile first step
    		this.compileStep();
    	},

      endSurvey: function(){
        console.log('survey results', this.model.results);
        var results = this.model.results;
        console.log('complete',this.model)

        // Calculations
        var gallons = ((results.tripdistance * (results.hwyper / 100)) / results.carmpghwy) + ((results.tripdistance * ((100 - results.hwyper) / 100)) / results.carmpgcity);
        gallons = (gallons * (2 * results.freq));

        var money   = (gallons * 3.33);
        var boi = (gallons / 19);

        var co2     = results.tripdistance * results.carco2;
        co2 = ((co2 * results.freq) * 2);

        var calories  = results.tripdistance * 48;
        calories = ((calories * results.freq) * 2);

        var data = {};
        data.oil = boi.toFixed(2);
        data.money = '$'+money.toFixed(2);
        data.gas = gallons.toFixed(2);
        data.calories = calories;

        console.log('gallons', gallons);
        console.log('money', money);
        console.log('co2', co2);
        console.log('cal', calories);
        console.log('boi', boi);

        this.$el.find('#survey-step').empty().append( surveyComplete(data) )

        /* Send data to database
         * ===================== */
        $.ajax({
          url: 'data/survey_insert.php',
          type: 'POST',
          data: this.model.results,
          onSuccess: function(data) {
            console.log(data)
          }
        });
      },

    	compileStep: function( step ){
    		var steps = this.model.get('steps').models,
    			step,
                view,
                parent,
    			stepsContent = [];

            // if first step in survey, show first set of choices
        	if ( !step ) step = steps[0].get('choices');
            // if custom step
            else if ( step.get('template') ) step = step;
            // else show the next step
        	else step = step.get('choices');
        	
        	this.currentStep = step;
        	
            // sets view depending on type of step
            if ( step && step.get('template') )
            view = new customStepView({ model: step, template: step.get('template') });
            else
            view = new choicesView({ collection: step });
    		
            this.surveyStep.show( view );
    	}

	});
});
