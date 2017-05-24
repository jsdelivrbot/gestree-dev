exports.up = (pgm) => {
    pgm.createTable({
        'schema': 'PSalgadas',
        'name': 'Interventions'
    }, {
        'id': {
            'type': 'serial',
            'primaryKey': true,
            'unique': true,
            'notNull': true
        },
        'id_type': {
            'type': 'int',
            'references': '"PSalgadas"."InterventionsType" (id)'
        },
        'id_tree': {
            'type': 'int',
            'references': '"PSalgadas"."arvores" (gid)'
        },
        'created_at': {
            'type': 'timestamp',
            'default': pgm.func('NOW()'),
            'notNull': true
        },
        'intervention_date': {
            'type': 'timestamp',
            'notNull': true,
        },
        'finished_at': {
            'type': 'timestamp'
        },
        'priority': {
            'type': 'int',
            'notNull': true,
            'check': 'priority > 0 AND priority <= 5'
        },
        'state': {
            'type': 'varchar(10)',
            'notNull': true,
            'default': 'ABERTA',
            'check': 'state = \'ABERTA\' OR state = \'FECHADA\' OR state = \'ARQUIVADA\''
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable({
        'schema': 'PSalgadas',
        'name': 'Interventions'
    });
};