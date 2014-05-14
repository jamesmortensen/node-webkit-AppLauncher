/**
 * Handles loading, compiling, and rendering HTML partial templates as HTML strings, with data.
 */
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


/**
 * Load the partial from filesystem and compile it with config.json data, returning the generated HTML.
 *
 * @param {String} filename The name of the template partial. For example, 'app/views/launchPanel.tpl'.
 * @param {Object} data The configuration data to load in the template.
 * @return {String} content The HTML rendered, with the data.
 */
TemplateLoader.prototype.render = function(filename, data) {
	if(filename === undefined || data === undefined) throw new Error("filename or data undefined.");
	var fs = require('fs');
	var Mustache = require('mustache');

	var template = fs.readFileSync(filename) + "";
	var content = Mustache.render(template, data);

	return content;
}
	