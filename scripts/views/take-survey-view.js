define([
	'backbone',
	'communicator',
	'views/metric-sliders-view',
	'views/choices-view',
    'views/custom-step-view',
	'hbs!tmpl/take-survey',
    'handlebars',],
function( Backbone, Communicator, metricSlidersView, choicesView, customStepView, takeSurveyTemp, Handlebars ){
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
                view,
                parent,
    			stepsContent = [];
  
    		if ( !step ) step = steps[0].get('choices');
    		else step = step.get('choices');
    		
            parent = step.parents[0];
    		this.currentStep = step;
    		
            if ( parent.get('template') )
            view = new customStepView({ model: parent, template: parent.get('template') });
            else
            view = new choicesView({ collection: step });
    		
            this.surveyStep.show( view );
    	}

	});
});