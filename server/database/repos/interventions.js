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

    console.log(values);

    var query = 'SELECT i.*,'
      + ' it.value as type,'
      + ' t.zona,'
      + ' to_char(closed_at, \'DD/MM/YYYY\') as st_closed_at'
      + ' FROM "gestree"."Interventions" i '
      + ' JOIN "gestree"."InterventionTypes" it ON it.id = i.id_type'
      + ' JOIN "gestree".trees t ON t.gid = i.id_tree AND t.parque = \'' + values.park + '\''
      + ' WHERE i.parque = \'' + values.park + '\'';

    if (values.team) {
      query += ' AND i.team = \'' + values.team + '\'';
    }

    if (values.season) {
      query += ' AND i.season =\'' + values.season + '\'';
    }

    if (values.year) {
      query += ' AND i.year = ' + values.year;
    }

    if (values.zone) {
      query += ' AND t.id_zona = ' + values.zone;
    }

    return rep.manyOrNone(query, values);
  }
};

