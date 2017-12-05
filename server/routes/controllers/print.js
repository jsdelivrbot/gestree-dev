const csv = require('csv-express');
const db = require('../../database/').db;
module.exports = {
  trees_csv: (req, res, next) => {
    db.trees.print_csv({parque: req.query.park}).then(data => {
      const filename = "Árvores - " + req.query.park;
      res.set('Content-Type', 'text/csv');
      res.set('Content-Disposition', 'attachment; filename="' + filename + '.csv"');
      res.status(200).csv(data, true);
    }).catch(err => next(err));
  },
  interventions_csv: (req, res, next) => {
    db.interventions.print_csv(req.query)
      .then(data => {
        var filename = "Intervenções - " + req.query.park;
        if(req.query.season) filename+= "_" +req.query.season;
        if(req.query.year) filename+= "_" + req.query.year;
        res.set('Content-Disposition', 'attachment; filename="' + filename + '.csv"');
        res.status(200).csv(data, true);
      })
      .catch(err => next(err));
  }
}