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
    getParks: getParks,
    findPark: findPark,
    getPeriodicities: getPeriodicities,
    getInterventionTypes: getInterventionTypes
  }

  function getInterventionDefaults() {
    var defaults = {};
    defaults.seasons = getSeasons();
    defaults.years = getYears();
    defaults.periodicities = getPeriodicities();
    defaults.teams = getTeams();
    defaults.parks = getParks();
    defaults.findPark = findPark;
    InterventionTypesHttp.getInterventionTypes()
      .then(function (types) {
        defaults.types = types;
        defaults.types.unshift({ id: 0, value: " -- " });
        deferred.resolve(defaults);
      })
    return deferred.promise;
  }
  function getInterventionTypes() {
    return InterventionTypesHttp.getInterventionTypes();
  }
  function getPeriodicities() {
    return ["--", 'Anual', 'Bi-Anual'];
  }
  function getTeams() {
    return ["--", "Interna", "Externa", "Outra"];
  }
  function getSeasons() {
    return ["--", "Primavera", "Verão", "Outono", "Inverno"];
  }
  function getParks() {
    return [{
      id: "PSalgadas",
      name: "Pedras Salgadas",
      zones: [
        { id: 0, nome: "--"},
        { id: 31, nome: "Avenida das Fontes" },
        { id: 3, nome: "Balneário Termal " },
        { id: 12, nome: "Campo de Ténis" },
        { id: 29, nome: "Capela" },
        { id: 15, nome: "Casa da Azinheira" },
        { id: 26, nome: "Casa da Faia" },
        { id: 16, nome: "Casa da Tuia" },
        { id: 13, nome: "Casa de Chá" },
        { id: 8, nome: "Casa de Passáros" },
        { id: 25, nome: "Casa do Abetto" },
        { id: 19, nome: "Casa do Azevinho" },
        { id: 20, nome: "Casa do Bordo" },
        { id: 21, nome: "Casa do Carvalho Negral" },
        { id: 27, nome: "Casa do Castanheiro" },
        { id: 24, nome: "Casa do Cedro" },
        { id: 22, nome: "Casa do Ciprestre" },
        { id: 18, nome: "Casa do Esquilo" },
        { id: 23, nome: "Casa do Medronheiro" },
        { id: 17, nome: "Casa do Pinheiro" },
        { id: 11, nome: "Casino" },
        { id: 9, nome: "Depósito" },
        { id: 6, nome: "Garagens e Portaria" },
        { id: 14, nome: "Grande Alcalina" },
        { id: 30, nome: "Grande Hotel" },
        { id: 7, nome: "Gruta" },
        { id: 2, nome: "Lago e Minigolfe" },
        { id: 28, nome: "Monte Avelames" },
        { id: 10, nome: "Observatório" },
        { id: 5, nome: "Parque Infantil e Chalet" },
        { id: 1, nome: "Piscina" },
        { id: 4, nome: "Roseiral" }
      ]
    }, {
      id: "Vidago",
      name: "Vidago Palace",
      zones: [
        { id: 0, nome: "--"},
        { id: 5, nome: "Avenida das Fontes" },
        { id: 9, nome: "Centro de congressos" },
        { id: 1, nome: "Cercado do Burro" },
        { id: 12, nome: "Clubhouse" },
        { id: 6, nome: "Coreto" },
        { id: 10, nome: "Coreto" },
        { id: 14, nome: "Entrada" },
        { id: 7, nome: "Estacionamento de serviço" },
        { id: 13, nome: "Fonte 1 e Chalet" },
        { id: 11, nome: "Fonte 2 e Lago" },
        { id: 4, nome: "Fonte Salus" },
        { id: 15, nome: "Lago" },
        { id: 2, nome: "Núcleo Rural e Polidesportivo" },
        { id: 3, nome: "Starter Golf" },
        { id: 8, nome: "Traseiras do Hotel" }
      ]
    }]
  }
  function findPark(name) {
    var parks = getParks();
    return parks.find(function (park) {
      return park.name === name;
    });
  }
  function getYears(year_range) {
    var YEAR_RANGE = year_range || 5;
    var currentYear = new Date().getFullYear();
    var years = [];
    for (var i = 0; i < YEAR_RANGE; i++) {
      years.push(currentYear + i);
    }
    years.unshift('--');
    return years;
  }

}