(function(window) {
	'use strict';

	/**
	 *	SpriteImage
	 *	
	 *	@author Alexandre Masy
	 */
	app.view.SpriteImage = Class.extend({

		//===========/----------------------------------------------
		//  [_PRO]  /  Properties
		//=========/------------------------------------------------

		/**
		 *	Width of the image
		 **/
		_width: 0,

		/**
		 *	Height of the image
		 **/
		_height: 0,

		/**
		 *	Image source
		 **/
		_src: null,

		/**
		 *	How many frames
		 **/
		_length: 0,

		/**
		 *	Duration of each image
		 **/
		_speed: 0,


		/**
		 *	Framerate
		 **/
		_framerate: 60,

		//===========/----------------------------------------------
		//  [_GET]  /  Getters Setters
		//=========/------------------------------------------------

		/**
		 *	Return the width
		 *
		 *	@return int
		 **/
		getWidth: function()
		{
			return this._width;
		},

		/**
		 *	Return the height
		 *
		 *	@return int
		 **/
		getHeight: function()
		{
			return this._height;
		},

		/**
		 *	Return the length, the number of images in the sprite
		 *
		 *	@return int
		 **/
		getLength: function()
		{
			return this._length;
		},

		/**
		 *	Return the speed
		 *
		 *	@return int
		 **/
		getSpeed: function()
		{
			return this._speed;
		},

		//===========/----------------------------------------------
		//  [_MTD]  /  Methods public
		//=========/------------------------------------------------

		/**
		 *	El constructor
		 *
		 *	@param img jQueryElement
		 *	@param ready Function ready callback
		 **/
		construct: function( img, ready ) 
		{
			this.img = img;
			this.ready = ready;

			this.init();
		},

		/**
		 *	Init the class
		 **/
		init: function() 
		{
			if (!this.img[0].complete)
				this.img.on( 'load', onLoadComplete.bind(this) )
			else
				this.getData();
		},

		/**
		 *	Retrieve the informations stored in the file
		 **/
		getData: function()
		{
			this.bitmap = new createjs.Bitmap( this.img );
			BinaryAjax( this.img[0].src, parseImage.bind(this) );
		},

		/** 
		 *	Return the requested frame
		 *
		 *	@param index int
		 *	@return createjs.Bitmap
		 **/	
		getFrame: function( index )
		{
			var data = this.sheet.getFrame( index );

			// var el = jQuery('<div>').addClass('domframe');
			// el.css({
			// 	'background-image': 'url('+this.img[0].src+')',
			// 	'background-position': data.rect.x+'px '+data.rect.y+'px',
			// 	width: this._width,
			// 	height: this._height,
			// });

			var r = data.rect;

			var c = jQuery('<div>')
						.addClass('domcontainer')
						.css({
							width: this._width,
							height: this._height,
							overflow: 'hidden'
						});

			var el = jQuery('<img>')
						.addClass('domframe')
						.attr({
							src: this.img[0].src,
						})
						.css({
							left: -data.rect.x+'px',
							top: -data.rect.y+'px'
						})
			;

			c.append( el );

			return c;
		},

		/**	
		 *	Return the animation wrapped in a sprite
		 *
		 *	@return createjs.Sprite
		 **/
		getSprite: function()
		{
			var ret = new createjs.Sprite( this.sheet );
			return ret;
		}	
	});

	//===========/----------------------------------------------
	//  [_PRI]  /  Methods private
	//=========/------------------------------------------------

	/**
	 *	Parse the image binary data and find the holy grale
	 *
	 *	@param http XMLHttpRequest
	 **/
	function parseImage( http )
	{
		var data = http.binaryResponse;

		if (data.getByteAt(0) != 0xFF || data.getByteAt(1) != 0xD8) 
		{
			return false; // not a valid jpeg
		}

		var length = data.getLength()-2;
		var i = length-100;
		var marker;

		// retrieve the data based on the marker sequence
		var pos = 0;
		var sequence = [0x2f, 0x2f, 0x67, 0x69, 0x66, 0x64, 0x61, 0x74, 0x61, 0x2F, 0x2F, 0x2D, 0x2D];
		var m = sequence.length;
		var flag = sequence[0];
		var s = ''
		var found = false

		while (i++ < length)
		{
			marker = data.getByteAt(i);

			if ( marker == flag )
			{
				pos ++;

				if ( pos == m )
				{
					found = true;
					i++;
				}
				else
				{
					flag = sequence[pos];
					continue;
				}
			}

			if ( found )
			{
				s += data.getCharAt(i);
			}
		}

		parseData.call( this, s );
	}

	/**
	 *	Parse the information stored in the file
	 *
	 *	@param data String
	 **/
	function parseData( data ) 
	{
		data = data.split('&');
		var n = data.length;
		var el;
		var key, val;
		while( n-- )
		{
			el = data[n];
			el = el.split('=');
			key = el[0];
			val = el[1];

			switch( key )
			{
				case 'count':
					this._length = val | 0;
					break;

				case 'width':
					this._width = val | 0;
					break;

				case 'height':
					this._height = val | 0;
					break;

				case 'speed':
					this._speed = parseFloat( val );
					break;

				case 'framerate':
					this._framerate = val | 0;
					break;
			}
		}

		// create the spritesheet
		var data = {
			framerate: this._framerate,
			images: this.img,
			frames: { width: this._width, height: this._height, count: this._length, speed:1 }
		}
		this.sheet = new createjs.SpriteSheet( data );

		this.ready();
	}

	/**
	 *	on image load complete
	 **/
	function onLoadComplete(event) 
	{
		this.getData();
	}

})(window);