var fs = require('fs');
if(!fs.existsSync('./config.json')) {
	global.config = JSON.parse(fs.readFileSync('./config.json.sample') + "");
    fs.createReadStream('config.json.sample').pipe(fs.createWriteStream('config.json'));
} else {
    global.config = JSON.parse(fs.readFileSync('./config.json') + "");
}

