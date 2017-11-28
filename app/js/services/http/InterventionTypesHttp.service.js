angular
  .module('unicerApp')
  .service('InterventionTypesHttp', InterventionTypesHttp);

InterventionTypesHttp.$inject = ["$q", "$http"];

function InterventionTypesHttp($q, $http) {
  var interventionTypes;

  return {
    getInterventionTypes: getInterventionTypes
  }

  function getInterventionTypes() {
    var deferred = $q.defer();
    if (interventionTypes) {
      deferred.resolve(interventionTypes);
    } else {
      $http.get("/api/intervention_types")
        .then(function (res) {
          interventionTypes = res.data;
          deferred.resolve(res.data);
        });
    }
    return deferred.promise;
  }
  
}