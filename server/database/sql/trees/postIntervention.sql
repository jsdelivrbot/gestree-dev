INSERT INTO ${schema~}."Interventions"
(id_tree, id_type, season, year, periodicity, team, comments, priority)
VALUES (${id_tree^}, ${id_type^}, ${season}, ${year}, ${periodicity}, ${team}, ${comments}, ${priority})
RETURNING *