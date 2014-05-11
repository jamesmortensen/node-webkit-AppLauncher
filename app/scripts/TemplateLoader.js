function TemplateLoader() {
	var templates = {};
}

TemplateLoader.prototype.load = function(filename) {
	var fs = require('fs');
    var content = fs.readFileSync(filename) + "";
    templates[filename] = content;
};

TemplateLoader.prototype.compile = function(filename, data) {
	var Mustache = require('mustache');
	var template = templates[filename];
	Mustache.render(template, data);
};

TemplateLoader.prototype.render = function(filename, data) {
	if(filename === undefined || data === undefined) throw new Error("filename or data undefined.");
	var fs = require('fs');
	var Mustache = require('mustache');

	var template = fs.readFileSync(filename) + "";
	var content = Mustache.render(template, data);

	return content;
}
	