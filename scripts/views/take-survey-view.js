define([
	'backbone',
	'communicator',
	'views/metric-sliders-view',
	'hbs!tmpl/take-survey',
	'hbs!tmpl/step-single-option'],
function( Backbone, Communicator, metricSlidersView, takeSurveyTemp, singleOptionTemp ){
	'use strict';

	return Backbone.Marionette.Layout.extend({
  		template: takeSurveyTemp,

    	regions: {
    	  metricSliders: "#metric-sliders",
    	  surveyStep: "#survey-step"
    	},

    	initialize: function(){
    	},

    	onRender: function(){
    		var metrics = this.model.get('metrics');
			
			// initialize metric sliders
    		this.metricSliders.show( new metricSlidersView({ collection: metrics }) );

    		// compile first step
    		this.compileStep();
    	},

    	compileStep: function( step ){
    		var steps = this.model.get('steps').models,
    			step,
    			stepsContent = [];
  
    		if ( !step )
    		step = steps[0];
    		else 
    		step = steps.find(function(model){
    			return model.get('step') == step;
    		});

    		step = step.get('choices');

    		for (var i = 0; i < step.length; i++){
    			stepsContent.push( singleOptionTemp(step[i]) );	
    		}
    		
    		this.$el.find('#survey-step').append( stepsContent.join('') );
    	}

	});
});