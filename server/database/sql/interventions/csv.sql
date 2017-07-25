SELECT *, 'pedras_salgadas' as parque
FROM "PSalgadas"."Interventions"
WHERE season = ${season} AND year = ${year};