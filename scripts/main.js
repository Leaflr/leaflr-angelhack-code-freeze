require([
	'backbone',
	'communicator',
	'application'
],
function ( Backbone, Communicator, App ) {
    'use strict';

	App.start();
	Communicator.events.trigger('startSurvey', 'bike');

});
