SELECT i.*, 
ty.value as value_type,
(SELECT row_to_json(tree) as tree
 FROM ( 
 SELECT a.*
 FROM "gestree".trees a
 WHERE a.gid = i.id_tree AND a.parque = i.parque) tree)
FROM "gestree"."Interventions" as i
JOIN "gestree"."InterventionTypes" ty ON i.id_type = ty.id
WHERE i.id = ${iid}