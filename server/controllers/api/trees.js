'use strict';

let db = require('../../database').db;

module.exports = {
    // GET All the trees
    all(req, res, next) {
        db.trees.all().then(data => {
            res.status(200).json(data);
        }).catch(err => next(err));
    },
    // Get Tree by tid
    get(req, res, next) {
        db.trees.get({
            'tid': req.params.tid
        }).then(data => {
            res.status(200).json(data);
        }).catch(err => next(err));
    },
    // Get Tree (tid) Interventions
    getInterventions(req, res, next) {
        db.trees.getInterventions({
            'tid': req.params.tid
        }).then(data => {
            res.status(200).json(data);
        }).catch(err => next(err));
    },
    // Add a new Intervention to the Tree (tid)
    postInterventions(req, res, next) {
        req.body.tid = req.params.tid;
        db.trees.postInterventions(req.body).then(data => {
            res.status(201).json(data);
        }).catch(err => next(err));
    }
}