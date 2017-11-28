SELECT 
a.gid as id_tree,
'Zona A' as zone,
'PINUS PINASTER (Teste)' as cient_name,
'PINHEIRO-BRAVO (Teste)' as comon_name,
2.3::float as height,
65 as diameter,
30 as diameter_top,
'Resinosa' as tipo,
1999 as year,
'Aproximadamente 20 anos' as age,
'' as comments,
(
    SELECT COUNT(*)::integer
    FROM "PSalgadas"."Interventions" old
    WHERE old.id_tree = a.gid AND state != 'ABERTA'
) as closed_interventions,
(
    SELECT COUNT(*)::integer
    FROM "PSalgadas"."Interventions" old
    WHERE old.id_tree = a.gid AND state = 'ABERTA'
) as open_interventions
FROM "PSalgadas".arvores a