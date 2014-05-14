/**
 * Read in configuration file, or create it if it doesn't exist.
 */
var fs = require('fs');
if(!fs.existsSync('./config.json')) {
	global.config = JSON.parse(fs.readFileSync('./config.json.sample') + "");
    fs.createReadStream('config.json.sample').pipe(fs.createWriteStream('config.json'));
} else {
    global.config = JSON.parse(fs.readFileSync('./config.json') + "");
}

var Log = require('log');
var log = new Log();

/**
 * Watch the window for when it changes to website_url, then resize as per config.json properties.
 */
global.onWindowLocationChange = function(windowDimensions, gui) {
	log.info(gui.Window.get().window.location.href);
	var currentWindow = gui.Window.get().window.location.href;
	var width = windowDimensions.width;
	var height = windowDimensions.height;
	var count = 0;
	var interval = setInterval(function() {
		if(gui.Window.get().window.location.href != currentWindow || count > 30000) {
          gui.Window.get().resizeTo(width, height);
          gui.Window.get().moveTo(110,80);
          clearInterval(interval);
        }
        log.info(gui.Window.get().window.location.href);
        count+=150;
    },150);
}