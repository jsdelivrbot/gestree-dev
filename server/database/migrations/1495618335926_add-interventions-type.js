exports.up = (pgm) => {
    pgm.createTable({
        'schema': 'PSalgadas',
        'name': 'InterventionTypes'
    }, {
        'id': {
            'type': 'serial',
            'primaryKey': true,
            'unique': true,
            'notNull': true
        },
        'typeName': {
            'type': 'varchar(50)',
            'unique': true,
            'notNull': true
        },
        'typeDescription': {
            'type': 'varchar(250)'
        }
    });
    pgm.sql('INSERT INTO "PSalgadas"."InterventionTypes" ("typeName", "typeDescription") ' +
        'VALUES (\'Inter1\', \'Desc1\'), (\'Inter2\', \'Desc2\'), (\'Inter3\', \'Desc3\')');
};

exports.down = (pgm) => {
    pgm.dropTable({
        'schema': 'PSalgadas',
        'name': 'InterventionTypes'
    });
};