const trees = require('./controllers/api/trees');
const interventions = require('./controllers/api/interventions');
const interventionTypes = require('./controllers/api/intervention_types');
module.exports = function (router) {

  router.get('/trees/:parque', trees.all);
  router.get('/trees/:parque/:tid', trees.get);
  router.get('/trees/:parque/:tid/interventions', trees.getInterventions);
  router.post('/trees/:parque/:tid/interventions', trees.postIntervention);
  router.get('/trees/:parque/:tid/interventions/:iid', trees.getIntervention);
  router.put('/trees/:parque/:tid/interventions/:iid', trees.updateIntervention);

  router.get('/interventions', interventions.all);
  router.get('/interventions/filter', interventions.filter);
  router.get('/interventions/:iid', interventions.get);
  router.put('/interventions/:iid', interventions.put);
  
  router.get('/intervention_types', interventionTypes.all);


  return router;

};