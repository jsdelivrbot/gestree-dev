SELECT i.*, 
ty.value as value_type,
(SELECT row_to_json(tree) as tree
 FROM ( 
 SELECT 
  a.gid as id_tree,
  a.zona as zone,
  a.id_zona as zone_id,
  a.parque as parque,
  a.n_cient as cient_name,
  a.n_comum as comon_name, 
  to_char(a.f_h, '9999.00') as height,
  to_char(a.f_d, '9999.00') as diameter,
  to_char(a.f_dc, '9999.00') as diameter_top,
  a.s_tipo_m as type,
  a.i_ano_p as year,
  a.s_idd as age
 FROM "gestree".trees a
 WHERE a.gid = i.id_tree AND a.parque = i.parque) tree)
FROM "gestree"."Interventions" as i
JOIN "gestree"."InterventionTypes" ty ON i.id_type = ty.id
WHERE i.id = ${iid}