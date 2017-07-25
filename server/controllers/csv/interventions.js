const csv = require('csv-express');
const db = require('../../database').db;

module.exports = {
    csv: (req, res) => {
        db.interventions.csv(req.query)
            .then(data => {
                const filename = "Intervenções_" + req.query.parque + "_" + req.query.season + "_" + req.query.year;
                res.set('Content-Disposition', 'attachment; filename="' + filename + '.csv"');
                res.status(200).csv(data, true);
            })
            .catch(err => {
                res.status(500).csv(err);
            });
    }
}