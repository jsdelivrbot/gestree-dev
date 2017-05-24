'use strict';

const trees = require('../controllers/trees');
const interventions = require('../controllers/interventions');

module.exports = function (router) {

    router.get('/trees', trees.all);
    router.get('/trees/:tid', trees.get);
    router.get('/trees/:tid/interventions', trees.getInterventions);
    router.post('/trees/:tid/interventions', trees.postInterventions)

    router.get('/interventions', interventions.all);
    router.get('/interventions/:iid', interventions.get);

    return router;

};