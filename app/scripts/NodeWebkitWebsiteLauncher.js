/**
 * 
 * Resize the window prior to logging in and redirect the app.
 *
 **/
function NodeWebkitWebsiteLauncher() {};

NodeWebkitWebsiteLauncher.prototype.get20PercentHeightWidth = function(_screen) {
	_screen = _screen || window.screen;
	var windowDimensions = {};
  windowDimensions.width = parseInt( _screen.width * .80 );
  windowDimensions.height = parseInt( _screen.height * .80 );

  windowDimensions.width = windowDimensions.width > 1400 ? 1400 : windowDimensions.width;
	windowDimensions.height = windowDimensions.height > 1024 ? 1024 : windowDimensions.height;

  return windowDimensions;
};

NodeWebkitWebsiteLauncher.prototype.resizeWindowToFitScreen = function(width, height, gui) {
	gui = gui || require('nw.gui');
  gui.Window.get().resizeTo(width, height);
};


// @controller
NodeWebkitWebsiteLauncher.prototype.runLoginAndLaunch = function(win) {
	win = win || window;

	var windowDimensions = this.get20PercentHeightWidth();
  this.resizeWindowToFitScreen(windowDimensions.width, windowDimensions.height);

  var website_url = global.config.launchPanel.website_href;
  win.location = website_url;
};


