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

		/**
		 *	Fullscreen display
		 **/
		_fullscreen: false,

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

			this.win = jQuery(window);
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
			var w = 0;
			var h = 0;

			if ( this._fullscreen )
			{
				w = this.win.width();
				h = this.win.height();
			}
			else
			{
				w = this.si.getWidth();
				h = this.si.getHeight();
			}

			this.canvas.attr({
				width: w,
				height: h
			});

			if (this.sprite)
			{
				var r = 1;
				if ( w > h )
				{
					r = h/this.si.getHeight();
				}
				else
				{
					r = w/this.si.getWidth();
				}
				var rw = r*this.si.getWidth() |0;
				var rh = r*this.si.getHeight() |0;

				this.sprite.x = ( w - rw )>>1;
				this.sprite.y = ( h - rh )>>1;

				this.sprite.scaleX =
				this.sprite.scaleY = r;
			}

		},

		/**
		 *	Display fullscreen or not
		 *
		 *	@param value Boolean
		 **/
		fullscreen: function( value )
		{
			this._fullscreen = value;

			if (value)
				this.view.addClass('fullscreen');
			else
				this.view.removeClass('fullscreen');

			this.updateLayout();
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