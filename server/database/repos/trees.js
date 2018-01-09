'use strict';
var sql = require('../sql').trees;
module.exports = (rep, pgp) => {
  return {
    all: values => rep.many(sql.all, values),
    allWithZone: values => rep.manyOrNone(sql.allWithZone, values),
    get: values => rep.one(sql.get, values),
    getInterventions: values => rep.manyOrNone(sql.getInterventions, values),
    postIntervention: values => rep.one(sql.postIntervention, values),
    getIntervention: values => rep.oneOrNone(sql.getIntervention, values),
    updateIntervention: values => rep.oneOrNone(sql.updateIntervention, values),
    print_csv: values => _filter(values)
  };

  function _filter(values) {

    var query = 'SELECT a.*, '
    + ' ( SELECT COUNT(*)::integer '
    +'    FROM "gestree"."Interventions" old '
    +'    WHERE old.id_tree = a.gid AND old.parque = a.parque AND state != \'ABERTA\' '
    +') as "Intervenções Fechadas", '
    +'( SELECT COUNT(*)::integer '
    +' FROM "gestree"."Interventions" old '
    +' WHERE old.id_tree = a.gid AND old.parque = a.parque AND state = \'ABERTA\' '
    +' ) as "Intervenções Abertas" '
    +' FROM "gestree".trees a '
    +' WHERE a.parque = \'' + values.park + '\'';

    if (values.zone) {
      query += " AND a.id_zona = " + values.zone;
    }

    return rep.manyOrNone(query, values);
  }
};