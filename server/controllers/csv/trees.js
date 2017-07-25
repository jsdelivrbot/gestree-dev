const csv = require('csv-express');
const db = require('../../database').db;

module.exports = {
    all: (req, res, next) => {
        db.trees.all().then(data => {
            const filename = "Árvores_" + req.query.parque;
            res.set('Content-Disposition', 'attachment; filename="' + filename + '.csv"');
            res.status(200).csv(data, true);
        }).catch(err => next(err));
    }
}