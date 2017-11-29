SELECT i.*,
ty.value as type,
'PedrasSalgadas' as parque
FROM "PSalgadas"."Interventions" i
JOIN "PSalgadas"."InterventionTypes" ty ON i.id_type = ty.id
JOIN "PSalgadas"."arvores" t ON i.id_tree = t.gid;