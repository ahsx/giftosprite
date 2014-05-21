(function(window) {
	'use strict';

	/**
	 *	CanvasGif
	 *	
	 *	@author Alexandre Masy
	 */
	app.view.CanvasGif = Class.extend({

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

			var img = jQuery('#sprite');
			this.si = new app.view.SpriteImage( img, onSpriteComplete.bind(this) );
			this.canvas = jQuery('canvas');
			
			this.stage = new createjs.Stage( this.canvas[0] );
			createjs.Ticker.setFPS(60);
		},

		/**
		 *	Create the children
		 **/
		createChildren: function()
		{
			this.sprite = this.si.getSprite();
			this.stage.addChild( this.sprite );
			this.sprite.play();

			this.updateLayout();
		},

		/**
		 *	Show the view
		 **/
		show: function() 
		{
			this.view.removeClass('hidden');
			createjs.Ticker.addEventListener('tick', this.stage );
		},

		/**
		 *	Hide the view
		 **/
		hide: function() 
		{
			this.view.addClass('hidden');

			createjs.Ticker.removeEventListener( 'tick', this.stage );
		},

		/**
		 *	Update the layout
		 **/
		updateLayout: function()
		{
			this.canvas.attr({
				width: this.si.getWidth(),
				height: this.si.getHeight()
			});
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
	
	/**
	 *	Sprite setup complete
	 **/
	function onSpriteComplete()
	{
		console.log('sprite ready');
		this.createChildren();
	}

	/**
	 *	Tick handler
	 **/
	function onTickHandler()
	{
		if (this.stage)
			this.stage.update();
	}

})(window);