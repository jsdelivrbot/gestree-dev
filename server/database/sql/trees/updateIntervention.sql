UPDATE "Interventions"."Interventions" 
SET id_type = ${id_type}, finished_at = ${finished_at}, priority = ${priority}, state = ${state}
WHERE id_tree = ${tid} AND id = ${iid}
RETURNING *