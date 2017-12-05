SELECT a.*,
(
    SELECT COUNT(*)::integer
    FROM "gestree"."Interventions" old
    WHERE old.id_tree = a.gid AND old.parque = a.parque AND state != 'ABERTA'
) as "Intervenções Fechadas",
(
    SELECT COUNT(*)::integer
    FROM "gestree"."Interventions" old
    WHERE old.id_tree = a.gid AND old.parque = a.parque AND state = 'ABERTA'
) as "Intervenções Abertas"
FROM "gestree".trees a 
WHERE a.parque = ${parque}