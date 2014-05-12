#!/usr/bin/env node

console.log("*** If there are errors, you may be missing the npm package manager. You can get npm and Node.js from http://nodejs.org/\n\n");
console.log("*** Install dependencies...\n\n");

console.log("*** Get node-webkit...\n\n");

var fs = require('fs');
var mkdirp = require('mkdirp');
mkdirp('node_modules/node-webkit', function(err) {
	if(err) throw Error(err + " occurred while trying to download node-webkit.");
	var url = "";
	if(process.platform == 'darwin') {
	    url = 'http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-osx-ia32.zip';
	} else if(process.platform.match(/win(32|64)/)) {
		url = 'http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-win-ia32.zip';
	} else if(process.platform == 'linux32') {
		url = 'http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-linux-ia32.tar.gz';
	} else if(process.platform == 'linux64') {
		url = 'http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-linux-x64.tar.gz';
	} else {
		throw Error("Unknown platform " + process.platform);
	}
	download(url, 'node_modules/node-webkit/node-webkit.tar.gz');
});

var download = function(url, dest, cb) {
	var ProgressBar = require('progress');
	var http = require('http');
	var bar = new ProgressBar(':bar', { total: 10 });
	var output = url.split('/')[4];
	var options = {
	    proxy: 'http://host:port'
	};
	var file = fs.createWriteStream(dest);
	var request = http.get(url, function(response) {
		response.pipe(file);
		var len = parseInt(response.headers['content-length'], 10);
		var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
		    complete: '=',
		    incomplete: ' ',
		    width: 20,
		    total: len
		});
		response.on('data', function (chunk) {
		    bar.tick(chunk.length);
		});
		file.on('finish', function() {
		    file.close(cb);  // close() is async, call cb after close completes.
		});
	}).on('error', function(err) { // Handle errors
		fs.unlink(dest); // Delete the file async. (But we don't check the result)
		if (cb) cb(err.message);
	}).on('data', function(d) {
		console.log(">> >>");
	});
};

/*mkdir -p node_modules/node-webkit && cd node_modules/node-webkit
wget http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-osx-ia32.zip
unzip node-webkit-v0.9.2-osx-ia32.zip
*/