exports.up = (pgm) => {
    pgm.sql('CREATE OR REPLACE VIEW trees AS ' +
        'SELECT a.*, i.id::boolean as has_inter ' +
        'FROM "PSalgadas"."arvores" a ' +
        'LEFT OUTER JOIN "PSalgadas"."Interventions" i ON a.gid = i.id_tree');
};

exports.down = (pgm) => {
    pgm.sql('DROP VIEW trees');
};