define(['backbone','communicator'], function( Backbone, Communicator ){

	var interfaceEvents = function(){

		var lastOption;

		$(document).on('click', '.options-wrapper .option', function(e){
			var target = $(e.target).closest('.option'),
				next = target.attr('data-loads');

			lastOption = target.attr('id');

			target.parent().hide();
			$(next).show();

			if (target.hasClass('start-bike-survey'))
			Communicator.events.trigger('start-survey', 'bike');
			
		});
	}

	interfaceEvents();

});