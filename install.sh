#!/bin/sh

echo "*** If there are errors, you may be missing the npm package manager. You can get npm and Node.js from http://nodejs.org/\n\n"
echo "*** Get node-webkit...\n\n"

mkdir -p node_modules/node-webkit && cd node_modules/node-webkit
wget http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-osx-ia32.zip
unzip node-webkit-v0.9.2-osx-ia32.zip

echo "*** Install dependencies...\n\n"
cd ../..
npm install
cd tests
npm install
cd ..

echo "\n\nIf there are no errors, type 'npm start' to run the app and 'npm test' to run the tests\n\n"

