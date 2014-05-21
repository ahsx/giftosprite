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
			console.log('AnimatedGif - Show');
			this.view.removeClass('hidden');
		},

		/**
		 *	Hide the view
		 **/
		hide: function() 
		{
			console.log('AnimatedGif - Hide');
			this.view.addClass('hidden');
		}
	});

	//===========/----------------------------------------------
	//  [_PRI]  /  Methods private
	//=========/------------------------------------------------

})(window);