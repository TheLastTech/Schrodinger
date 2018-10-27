require("babel-core/register");
require("babel-polyfill");
require('babel-register')({
    presets: [ 'env', "es2015", "stage-0" ],
    plugins:[   "transform-runtime",
        "transform-async-to-generator"]
})

module.exports = require('./bot.js')
