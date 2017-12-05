let db = require('../../../database').db;
module.exports = {
  all(req, res, next) {
    db.interventions.all()
      .then(data => res.status(200).json(data))
      .catch(err => next(err))
  },
  allWithState(req, res, next) {
    if (req.query.state) {
      db.interventions.allWithState({
        state: req.query.state
      }).then(data => {
        res.status(200).json(data);
      }).catch(err => next(err));
    } else {
      db.interventions.all().then(data => {
        res.status(200).json(data);
      }).catch(err => next(err));
    }
  },
  get(req, res, next) {
    db.interventions.get({
      'iid': req.params.iid
    })
      .then(data => {
        res.status(200).json(data);
      }).catch(err => next(err));
  },
  put(req, res, next) {
    db.interventions.put(req.body)
      .then(data => {
        res.status(200).json(data);
      }).catch(err => next(err));
  },
  filter(req, res, next) {
    db.interventions.filter({
      park: req.query.parque,
      season: req.query.season,
      year: req.query.year
    })
      .then(data => {
        res.status(200).json(data);
      }).catch(err => {
        next(err)
      });
  }
}