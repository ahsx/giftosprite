/**
 *	Start the application
 *
 *	@author Alexandre Masy
 */
(function(window)
{
	'use strict';
	
	/**
	 *	Document ready event
	 */
	jQuery("document").ready(function(event)
	{
		new app.Application();
	});

})(window);