UPDATE "gestree"."Interventions" 
SET 
id_type = ${id_type},
season = ${season}, 
year = ${year},
periodicity = ${periodicity},
team = ${team},
comments = ${comments},
priority = ${priority},
state= ${state},
closed_at = ${closed_at}
WHERE id = ${id}
RETURNING *