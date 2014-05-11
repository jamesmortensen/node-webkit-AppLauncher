// tests for the App Launcher

describe("Website App Launcher", function() {
	
	it("should return a window size 80% of height and width as integer values, unless larger than a standard monitor", function() {
		var nodeWebkitWebsiteLauncherTests = new NodeWebkitWebsiteLauncher();
		
		var windowDimensionsMacbookPro = nodeWebkitWebsiteLauncherTests.get20PercentHeightWidth({width:1400,height:900});
		expect(windowDimensionsMacbookPro.width).toEqual(1120);
		expect(windowDimensionsMacbookPro.height).toEqual(720);

		var windowDimensionsWindowsXP = nodeWebkitWebsiteLauncherTests.get20PercentHeightWidth({width:1280,height:1024});
		expect(windowDimensionsWindowsXP.width).toEqual(1024);
		expect(windowDimensionsWindowsXP.height).toEqual(819);

		var windowDimensionsMacThunderbolt = nodeWebkitWebsiteLauncherTests.get20PercentHeightWidth({width:2560,height:1440});
		expect(windowDimensionsMacThunderbolt.width).toBeLessThan(1401);
		expect(windowDimensionsMacThunderbolt.height).toBeLessThan(1281);
	});

	it("should resize the test window, wait 2 seconds, put it back, and verify location would change to target website", function(done) {
		var nodeWebkitWebsiteLauncherTests = new NodeWebkitWebsiteLauncher();
		var gui = { Window: { get: function() { return {width: 700, height: 504, resizeTo: function() {}}}}};
		if(typeof require != "undefined") {
			gui = require('nw.gui');
		}
		var winMock = {
			location: ""
		};
		var origWidth = gui.Window.get().width;
		var origHeight = gui.Window.get().height;
		
		nodeWebkitWebsiteLauncherTests.runLoginAndLaunch(winMock);
		
		expect(winMock.location).toEqual(require('../config.json').launchPanel.website_href);

		setTimeout(function() {
			gui.Window.get().resizeTo(origWidth, origHeight);
			done();
			/*expect(true).toEqual(true);*/
		},2000);
	});
});