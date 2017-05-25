'use strict';

const trees = require('../controllers/api/trees');
const interventions = require('../controllers/api/interventions');

module.exports = function (router) {

    router.get('/trees', trees.all);
    router.get('/trees/:tid', trees.get);
    router.get('/trees/:tid/interventions', trees.getInterventions);
    router.post('/trees/:tid/interventions', trees.postIntervention);
    router.get('/trees/:tid/interventions/:iid', trees.getIntervention);
    router.put('/trees/:tid/interventions/:iid', trees.updateIntervention);

    router.get('/interventions', interventions.all);
    router.get('/interventions/:iid', interventions.get);

    return router;

};