SELECT i.*,
ty.value as type,
t.zona as zone
FROM "Interventions"."Interventions" i
JOIN "Interventions"."InterventionTypes" ty ON i.id_type = ty.id
JOIN "PSalgadas".trees t ON i.id_tree = t.gid;