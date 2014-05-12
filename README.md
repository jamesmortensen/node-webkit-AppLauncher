## node-webkit app launcher

This is a small framework for instantly converting a Web application to a desktop application, wrapping whatever Web application is specified in config.json.

This is mostly a basic demonstration of the powers of both node-webkit, as well as using the Jasmine test framework with node-webkit.


## Building

You'll of course need Node.js. If you don't have it already, [get it here](http://nodejs.org/download/).


### MacOS

You'll have the easiest time building and running on MacOS.  Just simply run the installer.

```
$ ./install.sh
```

Now, skip to the "Running node-webkit app" section.

### Windows and Linux

#### Obtain the node-webkit runtime

- Download the [node-webkit](https://github.com/rogerwang/node-webkit#downloads) binary for your platform.
- Extract the ZIP archive.

#### Install dependencies


Run the following commands from the app root to install node_modules dependencies:

```
$ npm install && cd tests && npm install
```


## Running node-webkit app

To run the app on Mac OS, simply type the following from the app root:

```
$ npm start
```

On other platforms, you'll need to configure this manually or run straight from the nodewebkit binary, where `.` is the "app" directory:

```
C>\path\to\nodewebkit .
```

## Running the tests

The tests use Jasmine, which runs in a node-webkit window so it has access to any Node.js API's and browser API's one might want to use in testing. To run the tests on Mac OS, run the following command from the app root:

```
$ npm test
```

On Windows and Ubuntu, you'll need to instead run the node-webkit binary and pass the tests folder in as an argument.

## Configuration

By default, the app loads up the [http://example.com](http://example.com) website, which is reserved for demonstrations and examples, without requiring any permission for use. To configure this to load another app, edit the **config.json**file to refer to your target application. The following properties are supported:

- app_name: The name of the application to display in the main panel.
- logo_href: A link to the website or Web application logo.
- website_url: The website or Web application to load after clicking the login link.


## Debugging

To debug, edit the package.json file and change the toolbar property to true, then restart the app. This exposes the debugger tools icon at the top right of the app window.

    "window": {
      "toolbar": true
    },

## License

This is licensed under the permissive [MIT license](http://opensource.org/licenses/MIT). Copyright &copy; 2014, James Mortensen
