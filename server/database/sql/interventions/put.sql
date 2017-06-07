UPDATE "PSalgadas"."Interventions" 
SET id_type = ${id_type}, created_at = ${created_at}, intervention_date = ${intervention_date}, finished_at = ${finished_at}, priority = ${priority}, state = ${state}
WHERE id = ${id}
RETURNING *