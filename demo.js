const { generate } = require('./generator')

let json = JSON.parse(require('fs').readFileSync('config.json').toString());
let data = generate(json);

fs = require('fs');
fs.writeFileSync("result.html", data);