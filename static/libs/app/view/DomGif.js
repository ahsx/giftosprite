(function(window) {
	'use strict';

	/**
	 *	DomGif
	 *	
	 *	@author Alexandre Masy
	 */
	app.view.DomGif = Class.extend({

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

			this.container = this.view.find('.container');
			this.win = jQuery(window);

			var img = jQuery('#sprite');
			this.si = new app.view.SpriteImage( img, onSpriteComplete.bind(this) );
		},

		/**
		 *	Create the children
		 **/
		createChildren: function()
		{
			var n = this.si.getLength();
			var prev, div, show, hide, tweens;
			this.timeline = new TimelineMax({repeat:-1});
			var speed = 1/this.si.getFramerate();

			while( n-- )
			{
				if ( div )
					prev = div;

				div = this.si.getFrame(n);

				// append
				this.container.append( div );

				// tweening
				tweens = [];
				if ( prev )
					tweens.push( TweenMax.to(prev, speed, {'display':'block', delay:speed}) );
				tweens.push( TweenMax.to(div, speed, {display:'none'}) );

				// timeline
				this.timeline.add(tweens);
			}

			this.frames = jQuery('.domframe');
			this.containers = jQuery('.domcontainer');
			this.updateLayout();
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
			this._fullscreen = value;

			if (value)
				this.view.addClass('fullscreen');
			else
				this.view.removeClass('fullscreen');

			this.updateLayout();
		},

		/** 
		 *	Update the layout
		 **/
		updateLayout: function()
		{
			if ( !this.frames )
				return;

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

			console.log( 'updateLayout', this._fullscreen, w, h );
			console.log( this.frames );

			TweenMax.set( this.containers, {
				scaleX: r,
				scaleY: r,
			});

			console.log( ( h - rh ) );

			TweenMax.set( this.container, {
				width: w,
				height: h
			});

			// TweenMax.set( this.containers, {
			// 	width: w,
			// 	height: h
			// })



			// this.sprite.x = ( w - rw )>>1;
			// this.sprite.y = ( h - rh )>>1;

			// this.sprite.scaleX =
			// this.sprite.scaleY = r;
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
		this.createChildren();
	}

})(window);