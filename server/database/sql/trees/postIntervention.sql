INSERT INTO "gestree"."Interventions"
(id_tree, id_type, season, year, periodicity, team, comments, priority, parque)
VALUES (${id_tree^}, ${id_type^}, ${season}, ${year}, ${periodicity}, ${team}, ${comments}, ${priority}, ${parque})
RETURNING *