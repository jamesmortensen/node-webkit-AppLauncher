/**
  * @author James Mortensen
  *
  * Script loader to load scripts outside of the node-webkit context.
  *
  * @example
  * new Script({src:"../../path/to/file.js"}).load();
  *
  * @constructor Creates an instance of Script.
  * @this {Script}
  * @param {object} attributes An object containing script tag attributes (src, type, etc)
  */
  var Script = function(attributes, fs, eval) {
    var attr = attributes;
    var scriptContents = "";
    fs = fs || require('fs');
    
    var evaluate = eval || window.eval;
    this.src = attributes.src;
    this.type = attributes.type;
    
    /**
      * load the scripts in this context.
      */
    this.load = function() {
      if (fs.existsSync(attr.src)) {
        var content = fs.readFileSync(attr.src);
        try {
           scriptContents = '' + content + '\n\n//@ sourceURL=' + this.src;
           evaluate( scriptContents );
        } catch (e) {
          console.error(e + " while trying to fetch " + attr.src + ". ");
        }
      } else {
        console.error("file not found: " + attr.src);
      }
    }

    this.getScriptContents = function() {
      return scriptContents;
    }
  }
