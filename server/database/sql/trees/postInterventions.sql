INSERT INTO ${schema~}."Interventions"
(id_type, id_tree, intervention_date, priority)
VALUES (${id_type^}, ${tid^}, ${intervention_date}, ${priority})
RETURNING *