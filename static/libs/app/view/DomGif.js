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
			var speed = this.si.getSpeed();

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
		},

		/**
		 *	Show the view
		 **/
		show: function() 
		{
			console.log('DomGif - Show');
			this.view.removeClass('hidden');
		},

		/**
		 *	Hide the view
		 **/
		hide: function() 
		{
			console.log('DomGif - Hide');
			this.view.addClass('hidden');
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