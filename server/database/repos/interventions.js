'use strict';
var sql = require('../sql').interventions;
module.exports = (rep, pgp) => {
  return {
    all: values => rep.many(sql.all, values),
    allWithState: values => rep.manyOrNone(sql.allWithState, values),
    get: values => rep.one(sql.get, values),
    put: values => rep.one(sql.put, values),
    print_csv: values => _filter(values),
    filter: values => _filter(values)
  };
  function _filter(values) {
    var query = 'SELECT *, to_char(closed_at, \'DD/MM/YYYY\') as st_closed_at FROM "Interventions"."Interventions"';
    if (values.season && values.year) {
      query = 'SELECT *, to_char(closed_at, \'DD/MM/YYYY\') as st_closed_at FROM "Interventions"."Interventions" WHERE season=\'' + values.season + '\' AND year=' + values.year;
    } else {
      if (values.season) {
        query = 'SELECT *, to_char(closed_at, \'DD/MM/YYYY\') as st_closed_at FROM "Interventions"."Interventions" WHERE season=\'' + values.season + '\'';
      }
      if (values.year) {
        query = 'SELECT *, to_char(closed_at, \'DD/MM/YYYY\') as st_closed_at FROM "Interventions"."Interventions" WHERE year=' + values.year;
      }
    }
    return rep.manyOrNone(query, values);
  }
};

