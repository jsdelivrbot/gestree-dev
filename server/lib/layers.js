'use strict';
const fs = require('fs');
const path = require('path');

var Layers = {};

Layers.getLayers = (req, res, next) => {
    var layers = JSON.parse(fs.readFileSync(path.join(__dirname, '../layer_data/layers.json')));
    res.locals.data = layers;
    next();
};

Layers.getUserLayers = (req, res, next) => {
    var layers = JSON.parse(fs.readFileSync(path.join(__dirname, '../layer_data/protected_layers.json')));
    res.locals.layers = layers;
    next();
};

module.exports = Layers;