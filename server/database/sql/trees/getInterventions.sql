SELECT i.*,
ty.value as type,
t.zona as zone
FROM 
"Interventions"."Interventions" i
JOIN "Interventions"."InterventionTypes" ty ON ty.id = i.id_type
JOIN "PSalgadas".trees t ON t.gid = i.id_tree
WHERE i.id_tree = 563 
AND i.parque = 'Pedras Salgadas'