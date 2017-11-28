var sql = require('../sql').interventionTypes;
module.exports = (rep, pgp) => {
    return {
        all: values => rep.many(sql.all, values)
    };
};