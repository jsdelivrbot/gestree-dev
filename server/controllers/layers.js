'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
    index(req, res) {
        res.status(200).json(JSON.parse(fs.readFileSync(path.join(__dirname, '../data/layers.json'))));
    }
};