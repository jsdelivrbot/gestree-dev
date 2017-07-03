'use strict';

const proxy = require('../controllers/geoserver');

module.exports = function (router) {

    router.get('/wms', proxy.reverseWMS);
    router.get('/wfs', proxy.reverseWFS);
    router.get('/pdf', proxy.print);
    router.post('/pdf', proxy.print_create);

    return router;

};