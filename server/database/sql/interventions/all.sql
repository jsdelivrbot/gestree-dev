SELECT i.*,
ty.value as type
FROM "PSalgadas"."Interventions" i
JOIN "PSalgadas"."InterventionTypes" ty ON i.id_type = ty.id
JOIN "PSalgadas".trees t ON i.id_tree = t.gid;