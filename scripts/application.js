define([
	'backbone',
	'communicator',
	'survey'
],

function( Backbone, Communicator, survey ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({});

	/* Add initializers here */
	App.addInitializer( function () {

	});
	
	return App;
});
