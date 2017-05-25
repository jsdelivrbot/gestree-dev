'use strict';

let db = require('../../database').db;

module.exports = {
    // GET All the trees
    all(req, res, next) {
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
        }).then(data => {
            res.status(200).json(data);
        }).catch(err => next(err));
    }
}