(function(window) {
	'use strict';

	/**
	 *	Application controller
	 *	
	 *	@author Alexandre Masy
	 */
	app.Application = Class.extend({

		//===========/----------------------------------------------
		//  [_PRO]  /  Properties
		//=========/------------------------------------------------

		/**
		 *	Current default value
		 **/
		_current : null,

		//===========/----------------------------------------------
		//  [_GET]  /  Getters Setters
		//=========/------------------------------------------------

		/**
		 *	Define the current rendering method
		 *
		 *	@param value String
		 **/
		setCurrent: function( value )
		{
			this._current = value;

			this.update();
		},

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
			this.data = app.Data;
			this.gui = new dat.GUI();

			this.gui.add( this.data, 'rendering', ['gif', 'canvas', 'dom']).onChange( changeHandler.bind(this) );

			// managers
			this.animated = new app.view.AnimatedGif( jQuery('#gif') );
			this.canvas = new app.view.CanvasGif( jQuery('#spritesheet') );
			this.dom = new app.view.DomGif( jQuery('#dom') );

			// start
			this.setCurrent( app.Data.DOM )

			// var rendering = this.gui.addFolder('Rendering');
			// rendering.add(this.data, 'gif').onChange( changeHandler.bind(this) );
			// rendering.add(this.data, 'canvas').onChange( changeHandler.bind(this) );
			// rendering.add(this.data, 'dom').onChange( changeHandler.bind(this) );
			// rendering.open();
		},

		/**
		 *	Update the application
		 **/
		update: function()
		{
			console.log('update', this._current);
			switch( this._current )
			{
				case app.Data.GIF:
				default:
					this.animated.show();
					this.canvas.hide();
					this.dom.hide();
					break;

				case app.Data.CANVAS:
					this.animated.hide();
					this.canvas.show();
					this.dom.hide();
					break;

				case app.Data.DOM:
					this.animated.hide();
					this.canvas.hide();
					this.dom.show();
					break;
			}
		}
	});

	//===========/----------------------------------------------
	//  [_PRI]  /  Methods private
	//=========/------------------------------------------------

	function changeHandler(value)
	{
		this.setCurrent( value );
	}

})(window);