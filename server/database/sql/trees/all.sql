SELECT 
a.gid as id_tree,
a.zona as zone,
a.parque as parque,
a.n_cient as cient_name,
a.n_comum as comon_name,
to_char(a.f_h, '9999.00') as height,
to_char(a.f_d, '9999.00') as diameter,
to_char(a.f_dc, '9999.00') as diameter_top,
a.s_tipo_m as type,
a.i_ano_p as year,
a.s_idd as age,
'' as comments,
(
    SELECT COUNT(*)::integer
    FROM "gestree"."Interventions" old
    WHERE old.id_tree = a.gid AND state != 'ABERTA'
) as closed_interventions,
(
    SELECT COUNT(*)::integer
    FROM "gestree"."Interventions" old
    WHERE old.id_tree = a.gid AND state = 'ABERTA'
) as open_interventions
FROM "gestree".trees a
WHERE a.parque = 'Vidago Palace'