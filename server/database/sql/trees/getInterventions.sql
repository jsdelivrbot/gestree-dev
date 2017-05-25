SELECT i.*, ty."typeName", ty."typeDescription" 
FROM ${schema~}."Interventions" i, ${schema~}."InterventionsType" ty
WHERE i.id_tree = ${tid^} 
AND i.id_type = ty.id