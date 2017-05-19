'use strict';

const layers = require('../controllers/layers');

module.exports = function (router) {

    router.get('/', layers.index);

    return router;

};