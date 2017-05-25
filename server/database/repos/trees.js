'use strict';
var sql = require('../sql').trees;
module.exports = (rep, pgp) => {
    return {
        all: values => rep.many(sql.all, values),
        get: values => rep.one(sql.get, values),
        getInterventions: values => rep.manyOrNone(sql.getInterventions, values),
        postInterventions: values => rep.one(sql.postInterventions, values)
    };
};