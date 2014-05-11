describe("Loading Templates", function() {
	
	it("should load launcherPanel", function() {
		var fs = require('fs');
		var template = fs.readFileSync('../app/views/launchPanel.tpl') + "";
		var data = {app_name: "NodeWebkitWebsiteLauncher", logo_href: "../app/images/logo.png"};

		var Mustache = require('mustache');
		var html = Mustache.render(template, data);

		var cheerio = require('cheerio');
		$ = cheerio.load(html);

		var appLogoSrc = $('img#app_logo').attr('src');
		expect(appLogoSrc).toEqual("../app/images/logo.png");
	});

	it("should load LauncherPanel using TemplateLoader", function() {
		var template = new TemplateLoader();

		var data = {app_name:"test", logo_href: "/test.img"};
		var html = template.render('../app/views/launchPanel.tpl', data);

        var cheerio = require('cheerio');
		$ = cheerio.load(html);

		var title = $('title').eq(0).html();
		expect(title).toEqual("Login to test");
	});
});