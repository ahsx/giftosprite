/**
 *	Namespace declaration
 *
 *	@author Alexandre Masy
 **/
(function(window)
{
	'use strict';
	
	/**
	 *	app base namespace
	 *	@namespace app
	 */
	window.app = (typeof(app) != 'undefined') ? app : {};

	/**
	 *	Views (Dom manipulation)
	 *	@namespace app.view
	 */
	window.app.view = {};

})(window);