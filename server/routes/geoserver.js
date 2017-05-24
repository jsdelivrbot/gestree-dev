'use strict';

const proxy = require('../controllers/geoserver');

module.exports = function (router) {

    router.get('/wms', proxy.reverseWMS);
    router.get('/wfs', proxy.reverseWFS);
    router.get('/pdf', proxy.print);

    return router;

};