const trees = require('../controllers/csv/trees');
const interventions = require('../controllers/csv/interventions');

module.exports = function (router) {

    router.get("/trees", trees.all);
    router.get("/inter", interventions.csv);

    return router;
}