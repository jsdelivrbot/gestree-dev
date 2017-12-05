SELECT i.*,
ty.value as type,
t.zona as zone
FROM "gestree"."Interventions" i
JOIN "gestree"."InterventionTypes" ty ON i.id_type = ty.id
JOIN "PSalgadas".trees t ON i.id_tree = t.gid;