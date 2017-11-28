const print = require('./controllers/print');
module.exports = function (router) {
  router.get('/csv/trees', print.trees_csv);
  router.get('/csv/interventions', print.interventions_csv);
  return router;
};