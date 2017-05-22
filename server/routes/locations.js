'use strict';

const locations = require('../controllers/locations');
const geojson = require('../lib/geojson');

module.exports = function (router) {

    router.get('/', function (req, res, next) {
        res.locals.data = [{
            gid: 1,
            geom: {"type": "Point", "coordinates": [-846738.4596996311, 5093264.360857087]},
            nome: "Pedras Salgadas"
        }, {
            gid: 2,
            geom: {"type": "Point", "coordinates": [-843316.1645941734, 5105620.796140056]},
            nome: "Vidago Palace"
        }];
        next();
    }, geojson.parseGeoJSON, locations.index);

    return router;

};