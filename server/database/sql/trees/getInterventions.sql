SELECT i.*,
ty.value as type,
ty.description as type_description
FROM 
${schema~}."Interventions" i, 
${schema~}."InterventionTypes" ty
WHERE i.id_tree = ${tid^} 
AND i.id_type = ty.id