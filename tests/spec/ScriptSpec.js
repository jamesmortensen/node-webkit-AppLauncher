/**
  * We use this Script loader to load scripts outside of the node-webkit context for testing. We also run tests on 
  * the script loader itself.
  *
  * Usage: new Script({src:"../../path/to/file.js"}).load();
  * 
  */
describe("Script loader", function() {
  
  var fsMock = {existsSync: function() { return true}, readFileSync: function(){ return "console.log('it works');"}};
  var evalMock = function(s) { console.log('evaluate "' +s+'"');}
  var script = new Script({src: "", type: "text/javascript"}, fsMock, evalMock);

  beforeEach(function() {
    script = new Script({src: "", type: "text/javascript"}, fsMock, evalMock);    
  });

  it("should simply print out what it will evaluate", function() {
    script.load();
    
    expect(script.getScriptContents()).toEqual("console.log('it works');\n\n//@ sourceURL=");
  });

  describe("Load a function...", function() {

    beforeEach(function() {
      fsMock = {existsSync: function() { return true}, readFileSync: function(){ return "function getOne() { return 1; }"}};
      spyOn(fsMock, 'existsSync').and.callFake(function() { return true; });
      script = new Script({src: "", type: "text/javascript"}, fsMock);
    });

    it("should load a function that returns 1 and the spy caught existsSync being called", function() {
      script.load();

      expect(getOne()).toEqual( 1 );
      expect(fsMock.existsSync).toHaveBeenCalled();
    });

  });
});
