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
        { id: 0, nome: "--" },
        { id: 31, nome: "Avenida das Fontes", extent: [43860.674, 208462.308267831, 44097.2807250976, 209065.765373682] },
        { id: 3, nome: "Balneário Termal ", extent: [43944.388, 208558.958497075, 44079.4575729246, 208761.9924] },
        { id: 12, nome: "Campo de Ténis", extent: [43899.64585, 208821.67024974, 44003.3538, 208976.830814358] },
        { id: 29, nome: "Capela", extent: [43817.4569173673, 208839.35423794, 43926.1175885201, 208925.9889], },
        { id: 15, nome: "Casa da Azinheira", extent: [43721.3482, 208615.4776, 43768.0393855883, 208681.267182222] },
        { id: 26, nome: "Casa da Faia", extent: [43858.3909098116, 208494.818440665, 43929.893, 208614.527200818] },
        { id: 16, nome: "Casa da Tuia", extent: [43750.0611671879, 208593.273, 43793.9665045547, 208681.267182222] },
        { id: 13, nome: "Casa de Chá", extent: [43946.0438227177, 208753.476593041, 44001.5058629713, 208909.724520881] },
        { id: 8, nome: "Casa de Passáros", extent: [43755.35975, 208728.23185276, 43855.3323169366, 208888.738395483] },
        { id: 25, nome: "Casa do Abetto", extent: [43828.1214863097, 208499.677652578, 43881.3827272647, 208566.820099047] },
        { id: 19, nome: "Casa do Azevinho", extent: [43788.2826429618, 208573.496059248, 43817.3121629101, 208616.864925832] },
        { id: 20, nome: "Casa do Bordo", extent: [43772.9819990117, 208506.837045523, 43797.4231315278, 208535.199459113] },
        { id: 21, nome: "Casa do Carvalho Negral", extent: [43789.3800840071, 208526.490621593, 43818.2851528213, 208578.365719] },
        { id: 27, nome: "Casa do Castanheiro", extent: [43813.3174754019, 208557.97762405, 43868.7814479943, 208625.954908031] },
        { id: 24, nome: "Casa do Cedro", extent: [43817.0686, 208463.878, 43897.6652416267, 208511.573574314] },
        { id: 22, nome: "Casa do Ciprestre", extent: [43813.9369405137, 208542.105280908, 43851.4265850152, 208581.965479248] },
        { id: 18, nome: "Casa do Esquilo", extent: [43774.2690017352, 208529.79802407, 43795.2600848045, 208599.904547939] },
        { id: 23, nome: "Casa do Medronheiro", extent: [43787.6314, 208489.252, 43834.8236761157, 208555.267029872] },
        { id: 17, nome: "Casa do Pinheiro", extent: [43779.533072807, 208598.443974244, 43823.3042601858, 208653.539027209] },
        { id: 11, nome: "Casino", extent: [43708.8045554272, 208651.455150922, 43860.9311741564, 208792.6210551] },
        { id: 9, nome: "Depósito", extent: [43675.3470696784, 208735.692170034, 43760.3152877867, 208807.489803537] },
        { id: 6, nome: "Garagens e Portaria", extent: [43929.6661950791, 208976.830814358, 44013.273286719, 209083.716484633] },
        { id: 14, nome: "Grande Alcalina", extent: [43914.261, 208696.10370806, 43977.4295654196, 208775.993215322] },
        { id: 30, nome: "Grande Hotel", extent: [43813.7904562498, 208703.114, 43954.6267233635, 208865.970411081] },
        { id: 7, nome: "Gruta", extent: [43818.7644829972, 208881.2312, 43948.0857603283, 209019.950946566] },
        { id: 2, nome: "Lago e Minigolfe", extent: [44001.7157, 208742.580507337, 44109.087974707, 208966.24787249] },
        { id: 28, nome: "Monte Avelames", extent: [43806.3575659664, 208579.118763725, 43950.955, 208708.419] },
        { id: 10, nome: "Observatório", extent: [43661.0130375914, 208627.8333, 43738.6023425355, 208744.921138485] },
        { id: 5, nome: "Parque Infantil e Chalet", extent: [43876.2414736616, 208452.031403359, 44010.5816, 208529.594558112] },
        { id: 1, nome: "Piscina", extent: [44025.0045, 208930.067086977, 44092.9299807205, 209034.242339843] },
        { id: 4, nome: "Roseiral", extent: [43943.6884744044, 208483.8044, 44036.3608023003, 208599.229999999] }
      ]
    }, {
      id: "Vidago",
      name: "Vidago Palace",
      zones: [
        { id: 0, nome: "--" },
        { id: 5, nome: "Avenida das Fontes", extent: [46498.9845, 217489.999483097, 46617.9621575461, 218292.684272455] },
        { id: 9, nome: "Centro de congressos", extent: [46531.0181966032, 218328.025252417, 46611.3708937015, 218536.060508136] },
        { id: 1, nome: "Cercado do Burro", extent: [46462.4218118696, 217532.605501288, 46600.5077900117, 217756.265708016] },
        { id: 12, nome: "Clubhouse", extent: [46463.7985, 218075.577275582, 46519.88, 218187.320802064] },
        { id: 6, nome: "Coreto", extent: [46530.2394254834, 218071.528419621, 46645.3069363016, 218264.365380945] },
        { id: 10, nome: "Coreto", extent: [46522.4717137596, 218246.620071557, 46626.8075489991, 218317.355] },
        { id: 14, nome: "Entrada", extent: [46442.9466141505, 218243.386091724, 46614.724, 218391.981280812] },
        { id: 7, nome: "Estacionamento de serviço", extent: [46283.1896687427, 218154.7335, 46449.6357537877, 218529.551575359] },
        { id: 13, nome: "Fonte 1 e Chalet", extent: [46448.0619874613, 218185.800733946, 46520.17699, 218272.364644886] },
        { id: 11, nome: "Fonte 2 e Lago", extent: [46424.6972411675, 217990.095, 46511.151050836, 218109.876342416] },
        { id: 4, nome: "Fonte Salus", extent: [46565.2760966469, 217450.585892474, 46611.1989985182, 217536.050609917] },
        { id: 15, nome: "Lago", extent: [46395.5568659415, 218338.942193524, 46565.7453503453, 218534.829583112] },
        { id: 2, nome: "Núcleo Rural e Polidesportivo", extent: [46396.4359028875, 217751.996580544, 46564.3968249448, 217906.678646599] },
        { id: 3, nome: "Starter Golf", extent: [46459.1213036824, 217877.710345068, 46542.9697665875, 217992.14321878] },
        { id: 8, nome: "Traseiras do Hotel", extent: [46291.6051170259, 218221.679164848, 46486.0405655678, 218531.764791995] }
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