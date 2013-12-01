define([
	'backbone',
	'communicator',
	'views/metric-sliders-view',
	'views/choices-view',
	'hbs!tmpl/take-survey'],
function( Backbone, Communicator, metricSlidersView, choicesView, takeSurveyTemp ){
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
            console.log('end survey')
        },

    	compileStep: function( step ){
    		var steps = this.model.get('steps').models,
    			step,
    			stepsContent = [];
  
    		if ( !step ) step = steps[0].get('choices');
    		else step = step.get('choices');
    		
    		this.currentStep = step;
    		
    		this.surveyStep.show( new choicesView({ collection: step }) );
    	}

	});
});