const db = require('../../../database').db;
module.exports = {
  all(req, res, next) {
    db.interventionTypes.all()
      .then(data => res.status(200).json(data))
      .catch(err => next(err))
  }
}