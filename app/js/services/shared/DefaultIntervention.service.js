angular
  .module('unicerApp')
  .service('DefaultInterventionData', DefaultInterventionData);

DefaultInterventionData.$inject = ['$q', 'InterventionTypesHttp'];

function DefaultInterventionData($q, InterventionTypesHttp) {

  var deferred = $q.defer();

  return {
    getInterventionDefaults: getInterventionDefaults,
    getSeasons: getSeasons,
    getYears: getYears,
    getTeams: getTeams,
    getPeriodicities: getPeriodicities,
    getInterventionTypes: getInterventionTypes
  }

  function getInterventionDefaults() {
    var defaults = {};
    defaults.seasons = getSeasons();
    defaults.years = getYears();
    defaults.periodicities = getPeriodicities();
    defaults.teams = getTeams();
    InterventionTypesHttp.getInterventionTypes()
      .then(function (types) {
        defaults.types = types;
        deferred.resolve(defaults);
      })
    return deferred.promise;
  }
  function getInterventionTypes() {
    return InterventionTypesHttp.getInterventionTypes();
  }
  function getPeriodicities() {
    return ['-', 'Anual', 'Bi-Anual'];
  }
  function getTeams() {
    return ["-", "Interna", "Externa", "Outra"];
  }
  function getSeasons() {
    return ["Primavera", "Verão", "Outono", "Inverno"];
  }
  function getYears(year_range) {
    var YEAR_RANGE = year_range || 5;
    var currentYear = new Date().getFullYear();
    var years = [];
    for (var i = 0; i < YEAR_RANGE; i++) {
      years.push(currentYear + i);
    }
    return years;
  }

}