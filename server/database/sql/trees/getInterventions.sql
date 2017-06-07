SELECT i.*, ty."typeName", ty."typeDescription" 
FROM ${schema~}."Interventions" i, ${schema~}."InterventionTypes" ty
WHERE i.id_tree = ${tid^} 
AND i.id_type = ty.id