SELECT i.*, 
ty.value as value_type,
(SELECT row_to_json(tree) as tree
 FROM ( 
 SELECT a.gid, ST_AsGeoJson(a.geom)::JSON as geom
 FROM "PSalgadas".trees a
 WHERE a.gid = i.id_tree) tree)
FROM "PSalgadas"."Interventions" as i
JOIN "PSalgadas"."InterventionTypes" ty ON i.id_type = ty.id
WHERE i.id = ${iid}