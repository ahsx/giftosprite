(function(window) {
	'use strict';

	/**
	 *	AnimatedGif
	 *	
	 *	@author Alexandre Masy
	 */
	app.view.AnimatedGif = Class.extend({

		//===========/----------------------------------------------
		//  [_PRO]  /  Properties
		//=========/------------------------------------------------

		//===========/----------------------------------------------
		//  [_GET]  /  Getters Setters
		//=========/------------------------------------------------

		//===========/----------------------------------------------
		//  [_MTD]  /  Methods public
		//=========/------------------------------------------------

		/**
		 *	El constructor
		 *
		 *	@param view jQueryElement
		 **/
		construct: function( view ) 
		{
			this.view = view;

			this.init();
		},
		
		/**
		 *	Init the class
		 **/
		init: function() 
		{
			this.hide();	
		},

		/**
		 *	Show the view
		 **/
		show: function() 
		{
			this.view.removeClass('hidden');
		},

		/**
		 *	Hide the view
		 **/
		hide: function() 
		{
			this.view.addClass('hidden');
		},

		/**
		 *	Display fullscreen or not
		 *
		 *	@param value Boolean
		 **/
		fullscreen: function( value )
		{
			if (value)
				this.view.addClass('fullscreen');
			else
				this.view.removeClass('fullscreen');
		}
	});

	//===========/----------------------------------------------
	//  [_PRI]  /  Methods private
	//=========/------------------------------------------------

})(window);