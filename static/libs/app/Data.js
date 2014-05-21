(function(window) {
	'use strict';

	/**
	 *	Store application data
	 *	
	 *	@author Alexandre Masy
	 */
	app.Data = Class.extend({
		//===========/----------------------------------------------
		//  [_PRO]  /  Properties
		//=========/------------------------------------------------

		/**
		 *	Animated Gif 
		 **/
		GIF: 'gif',

		/**
		 *	Canvas animation
		 **/
		CANVAS: 'canvas',

		/**
		 *	Dom & TweenMax animation
		 **/
		DOM: 'dom',

		/**
		 *	Rendering mode
		 **/
		rendering: 'gif',

		//===========/----------------------------------------------
		//  [_GET]  /  Getters Setters
		//=========/------------------------------------------------

		//===========/----------------------------------------------
		//  [_MTD]  /  Methods public
		//=========/------------------------------------------------

		/**
		 *	El constructor
		 **/
		construct: function() 
		{
			this.init();
		},

		/**
		 *	Init the class
		 **/
		init: function() 
		{
		}
	}).prototype;
})(window);