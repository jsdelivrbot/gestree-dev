'use strict';
var sql = require('../sql').interventions;
module.exports = (rep, pgp) => {
    return {
        all: values => rep.many(sql.all, values),
        allWithState: values => rep.manyOrNone(sql.allWithState, values),
        get: values => rep.one(sql.get, values),
        put: values => rep.one(sql.put, values),
        csv: values => rep.manyOrNone(sql.csv, values),
        filter: values => rep.manyOrNone(sql.filter, values)
    };
};