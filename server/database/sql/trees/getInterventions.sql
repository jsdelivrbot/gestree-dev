SELECT i.*,
ty.value as type,
t.zona as zone,
t.id_zona as zone_id
FROM "gestree"."Interventions" i
JOIN "gestree"."InterventionTypes" ty ON ty.id = i.id_type
JOIN "gestree".trees t ON t.gid = i.id_tree AND t.parque = ${parque}
WHERE i.id_tree = ${tid}
AND i.parque = ${parque}