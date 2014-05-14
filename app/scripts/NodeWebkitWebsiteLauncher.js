/**
 * 
 * Resize the window prior to logging in and redirect the app.
 *
 **/
function NodeWebkitWebsiteLauncher() {};


/**
 * get window height and width dimensions at no more than 20% the width and height of the screen.
 */
NodeWebkitWebsiteLauncher.prototype.get20PercentHeightWidth = function(_screen) {
	_screen = _screen || window.screen;
	var windowDimensions = {};
  windowDimensions.width = parseInt( _screen.width * .80 );
  windowDimensions.height = parseInt( _screen.height * .80 );

  windowDimensions.width = windowDimensions.width > 1400 ? 1400 : windowDimensions.width;
	windowDimensions.height = windowDimensions.height > 1024 ? 1024 : windowDimensions.height;

  return windowDimensions;
};


/**
 * Resize the window to fit the screen, using the given dimensions.
 *
 * @param {Number} width The width to set the window.
 * @param {Number} height The height to set the window.
 */
NodeWebkitWebsiteLauncher.prototype.resizeWindowToFitScreen = function(width, height, gui) {
	gui = gui || require('nw.gui');
  gui.Window.get().resizeTo(width, height);
};


/**
 * The controller entry point. Detect appropriate window dimensions, change location, and once new page loads,
 * make the adjustments to the height, width, and positioning based on the configuration.
 */
NodeWebkitWebsiteLauncher.prototype.runLoginAndLaunch = function(win) {
	win = win || window;

	var windowDimensions = this.get20PercentHeightWidth();
  //this.resizeWindowToFitScreen(windowDimensions.width, windowDimensions.height);

  var website_url = global.config.launchPanel.website_href;
  win.location = website_url;

  // handle window resizing and positioning within the Node.js context
  global.onWindowLocationChange(windowDimensions, require('nw.gui'));
};


