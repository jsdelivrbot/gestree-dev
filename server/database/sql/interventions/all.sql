SELECT i.*,
ty.value as type,
a.gid as id_tree,
a.zona as zone,
a.id_zona as zone_id,
a.parque as parque,
a.n_cient as cient_name,
a.n_comum as comon_name,
a.f_h as height,
a.f_d as diameter,
a.f_dc as diameter_top,
a.s_tipo_m as tipo,
a.i_ano_p as year,
a.s_idd as age
FROM "gestree"."Interventions" i
JOIN "gestree"."InterventionTypes" ty ON i.id_type = ty.id
JOIN "gestree".trees a ON i.id_tree = a.gid AND i.parque = a.parque;