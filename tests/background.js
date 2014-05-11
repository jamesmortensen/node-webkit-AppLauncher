var fs = require('fs');
if(!fs.existsSync('../config.json')) {
	global.config = JSON.parse(fs.readFileSync('../config.json.sample') + "");
    fs.createReadStream('../config.json.sample').pipe(fs.createWriteStream('../config.json'));
} else {
    global.config = JSON.parse(fs.readFileSync('../config.json') + "");
}
var loaded = false;
exports.onload = function() {
  if(loaded) return;

  var Gaze = require('gaze').Gaze;
  var gaze = new Gaze('../**/*');   // watch from parent of the testrunner app so we include source files

  gaze.on('all', function(event, filepath) {
    if (window && window.location)
      window.location.reload();
  });
  loaded = true;
};
