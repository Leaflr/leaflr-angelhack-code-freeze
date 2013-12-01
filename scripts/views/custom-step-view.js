define(['backbone','communicator'], function( Backbone, Communicator ){
	'use strict';

	return Backbone.Marionette.ItemView.extend({
		events: {
			'click .submit':'triggerNext',
      'change .year': 'yearSelect',
      'change .make': 'makeSelect',
      'change .model': 'optSelect',
      'change .options': 'vehicleDone'
		},
		initialize: function(){
			console.log(this)
		},
    onRender: function() {
      if(this.model.get('step') == 'specific vehicle') {
        $('.options').hide();
        $.ajax({
          url: 'data/vehicle.php?year=0',
          success: function(data) {
            data = eval('('+data+')');
            $.each(data.menuItem, function(index, val) {
              var opt = $('<option>', {
                value: val.value,
                html: val.text
              });
              $(opt).appendTo($('.year'));
            });
          }
        });
      }
    },
		triggerNext: function(){
			Communicator.events.trigger('nextStep', this.model.get('nextStep'))
		},
    yearSelect: function() {
      var year = $('.year').val();
        $.ajax({
          url: 'data/vehicle.php?year='+year,
          success: function(data) {
            data = eval('('+data+')');
            $.each(data.menuItem, function(index, val) {
              var opt = $('<option>', {
                value: val.value,
                html: val.text
              });
              $(opt).appendTo($('.make'));
            });
          }
        });
    },
    makeSelect: function() {
      var make = $('.make').val();
      var year = $('.year').val();
        $.ajax({
          url: 'data/vehicle.php?year='+year+'&make='+make,
          success: function(data) {
            data = eval('('+data+')');
            $.each(data.menuItem, function(index, val) {
              var opt = $('<option>', {
                value: val.value,
                html: val.text
              });
              $(opt).appendTo($('.model'));
            });
          }
        });

    },
    optSelect: function() {
      var year = $('.year').val();
      var make = $('.make').val();
      var model = $('.model').val();
      var self = this;
        $.ajax({
          url: 'data/vehicle.php?year='+year+'&make='+make+'&model='+model,
          success: function(data) {
            data = eval('('+data+')');
            console.log('DATA', data.menuItem);
            console.log('CHECK', data.menuItem.length);
            // check single.
          if(data.menuItem.length > 0) {
            $('.options').show();
            $.each(data.menuItem, function(index, val) {
              var opt = $('<option>', {
                value: val.value,
                html: val.text
              });
              $(opt).appendTo($('.options'));
            });
          } else {
            console.log('NO OPTIONS');
            self.vehicleDone();
          } //end else
          }
        });
    },
    vehicleDone: function() {
      var year = $('.year').val();
      var make = $('.make').val();
      var model = $('.model').val();
      var option = $('.options').val();
      var self = this;
        $.ajax({
          url: 'data/vehicle.php?vid='+option,
          success: function(data) {
            data = eval('('+data+')');

            console.log('TEST', self.model);
            self.model.results.car_year = year;
            self.model.results.car_make = make;
            self.model.results.car_model = model;
            self.model.results.car_id = option;

            self.triggerNext();
          }
        });

    }
	});
});
