SELECT a.*,
(
    SELECT COUNT(*)::integer
    FROM "gestree"."Interventions" old
    WHERE old.id_tree = a.gid AND old.parque = a.parque AND state != 'ABERTA'
) as closed_interventions,
(
    SELECT COUNT(*)::integer
    FROM "gestree"."Interventions" old
    WHERE old.id_tree = a.gid AND old.parque = a.parque AND state = 'ABERTA'
) as open_interventions
FROM "gestree".trees a
WHERE a.gid = ${tid} AND a.parque = ${parque}