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
        console.log('survey results', this.model.results);
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
        console.log(step)

    		if ( !step ) step = steps[0].get('choices');
        else if ( step.get('template') ) step = step;
    		else step = step.get('choices');
    	
    		this.currentStep = step;
    		
        if ( step && step.get('template') )
        view = new customStepView({ model: step, template: step.get('template') });
        else
        view = new choicesView({ collection: step });
		
        this.surveyStep.show( view );
    	}

	});
});
