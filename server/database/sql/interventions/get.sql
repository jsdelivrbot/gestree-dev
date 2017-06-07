SELECT i.*, 
(SELECT row_to_json(tree) as tree
 FROM ( 
 SELECT a.gid, ST_AsGeoJson(a.geom)::JSON as geom
 FROM "PSalgadas"."arvores" a
 WHERE a.gid = i.id_tree) tree)
FROM "PSalgadas"."Interventions" as i
WHERE id = ${iid}