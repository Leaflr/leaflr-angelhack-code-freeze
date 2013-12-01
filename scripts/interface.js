define(['backbone','communicator'], function( Backbone, Communicator ){

	var interfaceEvents = function(){

		var lastOption;

		$(document).on('click', '.options-wrapper .option', function(e){
			var target = $(e.target).closest('.option'),
				next = target.attr('data-loads'),
				parent = target.parent(),
				parentHeight = parent.height( parentHeight );

			target.find('.icon').addClass('checked');
        	target.find('.icon-svg').addClass('checked').attr('src','img/icons/checkmark.svg');
        	target.siblings().find('.icon').addClass('not-checked');
        	target.addClass('fade-out').siblings().addClass('fade-out');

			lastOption = target.attr('id');

			window.setTimeout(function(){
				parent.fadeOut(500);
				$(next).fadeIn(900);
			}, 1000);

			if (target.hasClass('start-bike-survey'))
			Communicator.events.trigger('startSurvey', 'bike');
			
		});
	}

	interfaceEvents();

});