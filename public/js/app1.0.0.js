angular
  .module('unicerApp', [
    'ui.select',
    'ngSanitize',
    'ngMaterial',
    'ngMessages',
    'ngRoute'
  ])
  .constant('GlobalURLs', {
    host: "http://gistree.espigueiro.pt:8081",
    print: "http://gistree.espigueiro.pt:8081/print-servlet-3.8.0/print/gestree/report.pdf"
  });
angular
  .module('unicerApp')
  .config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    $mdDateLocaleProvider.shortMonths = ['jan', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    $mdDateLocaleProvider.days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'];
    $mdDateLocaleProvider.shortDays = ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'];
    $mdDateLocaleProvider.firstDayOfWeek = 1;
    $mdDateLocaleProvider.parseDate = function (dateString) {
      var m = moment(dateString, 'DD/MM/YYYY', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };
    $mdDateLocaleProvider.formatDate = function (date) {
      return date ? moment(date).format('DD/MM/YYYY') : '';
    };
    // In addition to date display, date components also need localized messages
    // for aria-labels for screen-reader users.
    $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
      return 'Semana ' + weekNumber;
    };
    $mdDateLocaleProvider.msgCalendar = 'Calendário';
    $mdDateLocaleProvider.msgOpenCalendar = 'Abrir o calendário';
    // You can also set when your calendar begins and ends.
    $mdDateLocaleProvider.firstRenderableDate = new Date(2000, 1, 1);
    $mdDateLocaleProvider.lastRenderableDate = new Date(2100, 12, 31);
  }])
angular
  .module('unicerApp')
  .run(function () {
    proj4.defs("EPSG:27493", "+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +towgs84=-223.237,110.193,36.649,0,0,0,0 +units=m +no_defs");
    var extent = [-127101.82, -300782.39, 160592.41, 278542.12];
    var projection = ol.proj.get('EPSG:27493');
    projection.setExtent(extent);
    ol.Collection.prototype.insertLayer = function (layer) {
      var index = this.getArray().findIndex(function (mapLayer) {
        return mapLayer.get('group') < layer.get('group');
      });
      if (index !== -1) {
        this.insertAt(index, layer);
      } else {
        this.push(layer);
      }
    };
    ol.layer.Base.prototype.isQueryable = function () {
      return this.get('queryable');
    };
  })
angular
  .module('unicerApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/templates/main/Map.html',
        controller: 'MapController',
        controllerAs: 'MapCtrl'
      })
      .when('/interventions', {
        templateUrl: 'views/templates/main/List-Interventions.html',
        controller: 'InterventionListController',
        controllerAs: 'interventionListCtrl',
        resolve: {
          Interventions: ['InterventionsHttp', _getAllInterventions]
        }
      })
      .when('/interventions/add', {
        templateUrl: 'views/templates/main/interventions/Intervention-Add.html',
        controller: 'InterventionAddController',
        controllerAs: 'addCtrl',
        resolve: {
          Defaults: ['DefaultInterventionData', _getDefaults]
        }
      })
      .when('/interventions/:int_id/update', {
        templateUrl: 'views/templates/main/interventions/Intervention-Update.html',
        controller: 'InterventionUpdateController',
        controllerAs: 'updateCtrl',
        resolve: {
          Intervention: ['$route', 'InterventionsHttp', _getIntervention],
          Defaults: ['DefaultInterventionData', _getDefaults]
        }
      })
      .when('/interventions/:int_id/info', {
        templateUrl: 'views/templates/main/interventions/Intervention-Info.html',
        controller: 'InterventionInfoController',
        controllerAs: 'infoCtrl',
        resolve: {
          Intervention: ['$route', 'InterventionsHttp', _getIntervention]
        }
      })
      .when('/interventions/:int_id/close', {
        templateUrl: 'views/templates/main/interventions/Intervention-Close.html',
        controller: 'InterventionCloseController',
        controllerAs: 'closeCtrl',
        resolve: {
          Intervention: ['$route', 'InterventionsHttp', _getIntervention]
        }
      })
      .when('/tree/:gid/interventions', {
        templateUrl: 'views/templates/main/Tree-Interventions.html',
        controller: 'TreeInterventionsController',
        controllerAs: 'treeInterventionsCtrl',
        resolve: {
          TreeInterventions: ['$route', 'TreesHttp', _getTree]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
  }]);

function _getAllInterventions(InterventionsHttp) {
  return InterventionsHttp.getAll();
}
function _getIntervention($route, InterventionsHttp) {
  return InterventionsHttp.get($route.current.params.int_id);
}
function _getDefaults(Defaults) {
  return Defaults.getInterventionDefaults();
}
function _getTree($route, TreesHttp){
  return TreesHttp.getTreeInterventions($route.current.params.gid);
}
angular
  .module('unicerApp')
  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.definePalette('whiteGreen', {
      '50': '5cb85c',
      '100': '000000',
      '200': '5cb85c',
      '300': '5cb85c',
      '400': '5cb85c',
      '500': '5cb85c',
      '600': '5cb85c',
      '700': '5cb85c',
      '800': '5cb85c',
      '900': '5cb85c',
      'A100': 'ffffff',
      'A200': '000000',
      'A400': '000000',
      'A700': '000000',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100',
        '200', '300', '400', 'A100'
      ],
      'contrastLightColors': undefined
    });
    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .backgroundPalette('whiteGreen');
  }])
angular
  .module('unicerApp')
  .controller('BaseLayerController', BaseLayerController);

BaseLayerController.$inject = ['$scope'];

function BaseLayerController($scope) {

  $scope.baseLayers = [
    {
      name: "Open Street Map",
      layerDef: new ol.layer.Tile({
        source: new ol.source.OSM({})
      })
    },
    {
      name: "Camada em Branco",
      layerDef: new ol.layer.Tile({})
    }
  ];
  $scope.baseLayer = "Mapa de Base";

  $scope.setBaseLayer = function (layer) {
    $scope.baseLayer = layer.name;
    Map.setBaseLayer(layer.layerDef);
  };
  
}
angular
  .module('unicerApp')
  .controller('InterventionListController', InterventionListController);

InterventionListController.$inject = [
  '$scope',
  'Interventions',
  'SortingService',
  'FilterSharedData',
  '$filter'
];

function InterventionListController($scope, Interventions, SortingService, FilterSharedData, $filter) {

  $scope.sort = SortingService.orderBySeasonYear;

  $scope.$watch(FilterSharedData.getFilter, _handleFilterUpdate, true);
  function _handleFilterUpdate(newVal, oldVal, scope) {
    scope.interventions = $filter('interventions-filter')(Interventions, newVal);
  }

};
angular
  .module('unicerApp')
  .controller('LayerIdentifierController', LayerIdentifierController);

LayerIdentifierController.$inject = ['$scope', 'LayerQueryResultsService'];

function LayerIdentifierController($scope, LayerRes) {
  var lrCtrl = this;
  activate();

  lrCtrl.title = "Resultados da Pesquisa";
  $scope.$watchCollection(function () {
    return LayerRes.getResults();
  }, function (res) {
    lrCtrl.results = res;
  });

  lrCtrl.hasResults = function () {
    return lrCtrl.results.length > 0;
  };

  function activate() {
    lrCtrl.results = [];
  };
}
angular
  .module('unicerApp')
  .controller('MapController', MapController);

MapController.$inject = ['MapService', 'DirtyDataManager'];

function MapController(MapService, DirtyDataManager) {
  MapService.init();
  MapService.drawMap();
  if (DirtyDataManager.isLayerDirty()) {
    MapService.reloadLayers();
    DirtyDataManager.cleanLayer();
  };
}  
angular
  .module('unicerApp')
  .controller('ParkSelectorController', ParkSelectorController);

ParkSelectorController.$inject = ['ParksHttp', 'Map'];

function ParkSelectorController(ParksHttp, Map) {
  var locCtrl = this;
  activate();

  function activate() {
    ParksHttp.getParks().then(function (loc) {
      locCtrl.locations = loc.features;
    });
    locCtrl.location = {};
  }
  locCtrl.onSelectCallback = function (model) {
    Map.zoomToCoordinate(model.geometry.coordinates, 'EPSG:3857');
  }
}
angular
  .module('unicerApp')
  .controller('TreeInterventionsController', TreeInterventionsController);

TreeInterventionsController.$inject = [
  '$scope',
  'SideNavService',
  'TreeInterventions',
  'SortingService',
  'FilterSharedData',
  '$filter',
];

function TreeInterventionsController($scope, SideNavService, TreeInterventions, SortingService, FilterSharedData, $filter) {
  SideNavService.setActiveTab(3);

  $scope.sort = SortingService.orderBySeasonYear;
  $scope.back = function(e){
    e.preventDefault();
    SideNavService.setActiveTab(1);
    window.history.back();
  }

  $scope.$watch(FilterSharedData.getFilter, _handleFilterUpdate, true);
  function _handleFilterUpdate(newVal, oldVal, scope) {
    scope.interventions = $filter('interventions-filter')(TreeInterventions, newVal);
  }
}
angular
  .module('unicerApp')
  .directive('interventionItem', InterventionItem);

function InterventionItem() {
  var directive = {
    bindToController: true,
    controller: InterventionItemController,
    controllerAs: 'intItemCtrl',
    restrict: 'E',
    scope: {
      intervention: "="
    },
    templateUrl: 'views/templates/components/interventionItem.html'
  };
  return directive;
}

InterventionItemController.$inject = ['$scope', '$location']
function InterventionItemController($scope, $location) {
  var intItemCtrl = this;
  $scope.edit = function () {
    $location.path('/interventions/' + intItemCtrl.intervention.id + '/update');
  };
  $scope.info = function () {
    $location.path('/interventions/' + intItemCtrl.intervention.id + '/info');
  };
  $scope.close = function () {
    $location.path('/interventions/' + intItemCtrl.intervention.id + '/close');
  };
}
angular
  .module('unicerApp')
  .directive('legendItem', LegendItem);

function LegendItem() {
  var directive = {
    restrict: 'A',
    scope: {
      title: '@',
    },
    transclude: true,
    templateUrl: 'views/templates/legendItem.html'
  };
  return directive;
}
angular
  .module('unicerApp')
  .directive('mapInteractions', MapInteractions);

MapInteractions.$inject = ['MapService'];
function MapInteractions(MapService) {
  var directive = {
    bindToController: true,
    controller: MapInteractionsController,
    controllerAs: 'itCtrl',
    link: link,
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/main/MapInteractions.html'
  }
  return directive;

  function link(scope, element, attrs) {
    var map = MapService.getMap();
    var mapControls = MapService.getControls();
    mapControls.item(2).setTarget(element.find('#coordinate4326')[0]);
    mapControls.item(2).setMap(map);
    mapControls.item(3).setTarget(element.find('#coordinate27493')[0]);
    mapControls.item(3).setMap(map);
  }

  MapInteractionsController.$inject = ['$scope', 'MapInteractionsService', 'LayerIdentifier', 'ParksHttp'];
  function MapInteractionsController($scope, MapInteractionsService, LayerIdentifier, ParksHttp) {
    var activeInteractionWatch, layerIdentifierWatch;

    $scope.setInteraction = MapInteractionsService.setActiveInteraction;
    $scope.isActive = MapInteractionsService.isActive;
    $scope.setDefaultView = MapInteractionsService.setDefaultView;
    ParksHttp.getParks().then(function (parks) {
      $scope.parks = parks;
      $scope.selectedPark = {};
      $scope.selectPark = function (coor, proj) {
        $scope.selectedPark = {};
        MapInteractionsService.zoomTo(coor, proj);
      }
    });

    $scope.$watch(MapInteractionsService.getActiveInteraction, _setActiveInteraction, true);
    function _setActiveInteraction(newVal, oldVal, scope) {
      scope.activeInteraction = newVal;
    };

    $scope.$watchCollection(LayerIdentifier.getLayers, _setLayerResults);
    function _setLayerResults(newVal, oldVal, scope) {
      newVal.reduce(function (promiseChain, currentValue) {
        return promiseChain.then(function (chainResults) {
          return currentValue.then(function (currentResult) {
            return chainResults.concat(currentResult);
          });
        });
      }, Promise.resolve([])).then(function (layerResults) {
        scope.$apply(function () {
          scope.layerResults = layerResults;
        });
      });
    };

  }
}
angular
  .module('unicerApp')
  .directive('treeDetails', TreeDetails);

function TreeDetails() {
  var directive = {
    bindToController: true,
    controller: TreeDetailsController,
    controllerAs: 'treeDetailsCtrl',
    scope: {},
    restrict: 'E',
    templateUrl: 'views/templates/components/TreeDetails.html'
  };
  return directive;

  TreeDetailsController.$inject = [
    '$scope', 
    'MapInteractionsService', 
    'TreeDetailsService', 
    'DirtyDataManager'
  ];
  function TreeDetailsController($scope, MapInteractionsService, TreeDetailsService, DirtyDataManager) {

    MapInteractionsService.getSelectInteraction().on('select', TreeDetailsService.getTreeDetails);
    $scope.$watch(TreeDetailsService.getSelectedTree, function (newVal, oldVal, scope) {
      scope.tree = newVal;
      if (scope.tree) {
        if(DirtyDataManager.isTreeDirty()) TreeDetailsService.getTree(scope.tree.gid);    
        scope.visible = true;
        scope.hasInterventions = scope.tree.open_interventions + scope.tree.closed_interventions; 
      } else {
        scope.visible = false;
      }
    });
    $scope.$on('$destroy', function () {
      MapInteractionsService.getSelectInteraction().un('select', TreeDetailsService.getTreeDetails);
    });

  }
};  
angular
  .module('unicerApp')
  .service('LegendsService', LegendsService);

function LegendsService() {
  var legends = [];

  return {
    getLegends: getLegends,
    addLegend: addLegend,
    removeLegend: removeLegend
  }

  function addLegend(layer) {
    var style = layer.data.style || '';
    var index = _findGroupIndex(legends, layer.parent);
    if (index > -1) {
      var layerIndex = _findIndex(legends[index].data, layer);
      if (layerIndex == -1) {
        legends[index].data.push({
          _key: layer.data.key,
          title: layer.title,
          url: 'http://gistree.espigueiro.pt/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layer.data.workspace + ':' + layer.data.name + '&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style=' + style
        });
      } else {
        legends[index].data[layerIndex] = {
          _key: layer.data.key,
          title: layer.title,
          url: 'http://gistree.espigueiro.pt/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layer.data.workspace + ':' + layer.data.name + '&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style=' + style
        }
      }
    } else {
      legends.push({
        title: layer.parent.title,
        data: []
      });
      addLegend(layer);
    }
  }
  function getLegends() {
    return legends;
  }
  function removeLegend(layer) {
    var index = _findGroupIndex(legends, layer.parent);
    var lIndex = _findIndex(legends[index].data, layer);
    _removeAt(legends[index].data, lIndex);
    if (legends[index].data.length == 0) {
      _removeAt(legends, index);
    }
  }

  function _findGroupIndex(array, data) {
    return array.findIndex(function (e) {
      return e.title == this.title;
    }, data);
  }
  function _findIndex(array, data) {
    return array.findIndex(function (e) {
      return e._key == this.data.key;
    }, data);
  }
  function _removeAt(a, i) {
    a.splice(i, 1);
  }
}

angular
  .module('unicerApp')
  .filter('capitalize', Capitalize);

function Capitalize() {
  return function (input) {
    if (!angular.isNumber(input)) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    } else {
      return input;
    }
  }
}
angular
  .module('unicerApp')
  .filter('interventions-filter', InterventionListFilter);

function InterventionListFilter() {
  return function (input, filterData) {
    var filteredInterventions = input;

    if (_hasNoFilters(filterData)) {
      return input;
    }

    for (var prop in filterData) {
      filteredInterventions = _filterArray(filteredInterventions, filterData, prop);
    }
    return filteredInterventions;
  };

  function _filterArray(array, filter, prop) {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i][prop] === filter[prop]) {
        filtered.push(array[i]);
      }
    }
    return filtered;
  }

  function _hasNoFilters(filterData) {
    for (var prop in filterData) {
      if (filterData.hasOwnProperty(prop))
        return false;
    }
    return true;
  };
}
angular
  .module('unicerApp')
  .controller('InterventionAddController', InterventionAddController);

InterventionAddController.$inject = [
  '$scope',
  '$routeParams',
  '$timeout',
  'InterventionsHttp',
  'Defaults',
  'SideNavService'
];

function InterventionAddController($scope, $routeParams, $timeout, InterventionsHttp, Defaults, SideNavService) {
  SideNavService.hide();

  $scope.defaults = Defaults;
  $scope.intervention = {
    periodicity: '-',
    comments: null,
    team: '-'
  };
  if ($routeParams.idTree) {
    $scope.intervention.id_tree = parseInt($routeParams.idTree);
    $scope.disableID = true;
  }

  $scope.back = _goBack;
  
  $scope.send = function () {
    var _self = this;
    if (!_dataIsInvalid()) {
      return;
    }
    InterventionsHttp.add(this.intervention)
      .then(function (res) {
        _self.message = "Intervenção adicionada com sucesso.";
        $timeout(function () {
          _goBack();
        }, 1000);
      }).catch(function (err) {
        _self.error = "Ocorreu um erro ao adicionar a intervenção.";
      });
  }

  bindSetters()
  function bindSetters() {
    $scope.setType = setValue.bind("type");
    $scope.setTeam = setValue.bind("team");
    $scope.setSeason = setValue.bind("season");
    $scope.setYear = setValue.bind("year");
    $scope.setPeriodicity = setValue.bind("periodicity");
    function setValue(val) {
      $scope.intervention[this] = val;
    }
  }
  function _dataIsInvalid() {
    var errors = { size: 0 };
    var requiredFields = ['id_tree', 'type', 'priority', 'season', 'year'];
    requiredFields.map(function (field, index) {
      if (!$scope.intervention.hasOwnProperty(field)) {
        errors[field] = true;
        errors.size++;
      }
    });
    if (errors.size > 0) {
      errors.message = "* Falta Preencher Campos Obrigatórios";
    }
    $scope.errors = errors;
    return errors.size === 0;
  }
  function _goBack(){
    SideNavService.show();
    window.history.back();
  }

}
angular
  .module('unicerApp')
  .controller('InterventionCloseController', InterventionCloseController);

InterventionCloseController.$inject = [
  '$scope',
  'Intervention',
  'InterventionsHttp',
  '$timeout',
  'SideNavService'
];

function InterventionCloseController($scope, Intervention, InterventionsHttp, $timeout, SideNavService) {
  $scope.intervention = Intervention;
  SideNavService.hide();

  $scope.back = function () {
    SideNavService.show();
    window.history.back();
  }
  $scope.close = function (form) {
    var _self = this;
    _self.error = '';
    if (form.$invalid) {
      return;
    }
    _self.intervention.state = "FECHADA";
    InterventionsHttp.close(_self.intervention)
      .then(function (data) {
        _self.message = "A intervenção foi fechada com sucesso.";
        $timeout(function () {
          window.history.back();
        }, 1000);
      }).catch(function (err) {
        _self.error = "Ocorreu um erro no fecho da intervenção.";
      });
  };
}
angular
  .module('unicerApp')
  .controller('InterventionInfoController', InterventionInfoController);

InterventionInfoController.$inject = [
  '$scope',
  'Intervention',
  'SideNavService'
];

function InterventionInfoController($scope, Intervention, SideNavService) {
  SideNavService.hide();
  $scope.intervention = Intervention;
  $scope.back = function () {
    SideNavService.show();
    window.history.back();
  }
}
angular
  .module('unicerApp')
  .controller('InterventionUpdateController', InterventionUpdateController);

InterventionUpdateController.$inject = [
  '$scope',
  'Intervention',
  'Defaults',
  'InterventionsHttp',
  'SideNavService'
];

function InterventionUpdateController($scope, Intervention, Defaults, InterventionsHttp, SideNavService) {
  SideNavService.hide();

  var _initalID = Intervention.id;
  var interTypes = Defaults.types;

  $scope.intervention = Intervention;
  $scope.defaults = Defaults;

  bindSetters();
  setInterventionType();

  $scope.save = function () {
    $scope.intervention.id = _initalID;
    $scope.error = '';
    InterventionsHttp.update($scope.intervention)
      .then(function (data) {
        $scope.message = "A intervenção foi alterada com sucesso.";
      }).catch(function (err) {
        $scope.error = "Ocorreu um erro ao tentar alterar a intervenção";
      });
  }
  $scope.back = function () {
    SideNavService.show();
    window.history.back();
  }

  function bindSetters() {
    $scope.setType = setValue.bind("type");
    $scope.setTeam = setValue.bind("team");
    $scope.setSeason = setValue.bind("season");
    $scope.setYear = setValue.bind("year");
    $scope.setPeriodicity = setValue.bind("periodicity");

    function setValue(val) {
      $scope.intervention[this] = val;
    }
  }
  function setInterventionType(){
    $scope.intervention.type = interTypes.find(function(type){
      return type.id === Intervention.id_type;
    });
  }

}
angular
  .module('unicerApp')
  .directive('interventionsTab', InterventionsTab);

function InterventionsTab() {
  var directive = {
    bindToController: true,
    controller: InterventionsTabController,
    controllerAs: 'intTabCtrl',
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/navigation/tabs/Tab-Interventions.html'
  };
  return directive;
}

InterventionsTabController.$inject = [
  '$scope',
  'DefaultInterventionData',
  'FilterSharedData',
  'SideNavService'
];

function InterventionsTabController($scope, Defaults, FilterSharedData, SideNavService) {

  $scope.filterData = {
    state: "ABERTA"
  };
  $scope.data = {};
  Defaults.getInterventionDefaults().then(function (defaults) {
    $scope.defaults = defaults;
  });

  $scope.setIdTree = setIdTree;
  $scope.setInterType = setInterType;
  $scope.setSeason = setSeason;
  $scope.setYear = setYear;
  $scope.resetFilter = resetFilter;

  $scope.$watch('filterData', function (newVal, oldVal) {
    FilterSharedData.setFilter(newVal);
  }, true);
  $scope.$watch(SideNavService.getActiveTab, function (activeTab, oldVal, scope) {
    if (activeTab === 3) {
      resetFilter.call(scope);   
    }
  }, true);

  function setIdTree(idTree) {
    if (idTree === null) {
      delete (this.filterData.id_tree);
    }
  }
  function setInterType(type) {
    this.filterData.id_type = type.id;
    this.data.typeName = type.value;
  }
  function setSeason(season) {
    this.filterData.season = season;
  }
  function setYear(year) {
    this.filterData.year = year;
  }
  function resetFilter() {
    this.data = {};
    this.filterData = {
      state: "ABERTA"
    };
  }

}
angular
  .module('unicerApp')
  .directive('layersTab', LayersTab);

LayersTab.$inject = ['MapService', 'Layers', 'LegendsService', '$timeout'];

function LayersTab(MapService, Layers, Legends, $timeout) {
  var directive = {
    bindToController: true,
    controller: LayersTabController,
    controllerAs: 'layersCtrl',
    link: link,
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/navigation/tabs/Tab-Layers.html'
  };
  return directive;

  function link(scope, element, attrs) {
    var fancytreeOptions = {
      extensions: ["edit", "glyph", "wide"],
      checkbox: true,
      glyph: {
        map: {
          checkbox: "fa fa-toggle-off",
          checkboxSelected: "fa fa-toggle-on",
          checkboxUnknown: "fa fa-circle",
          doc: "fa fa-search",
          docOpen: "fa fa-search",
          error: "fa fa-exclamation-triangle",
          expanderClosed: "fa  fa-arrow-right",
          expanderLazy: "fa fa-arrow-right",
          expanderOpen: "fa fa-arrow-down",
          folder: "fa fa-folder",
          folderOpen: "fa fa-folder-open",
          loading: "fa fa-spinner"
        }
      },
      clickFolderMode: 4,
      selectMode: 3,
      source: {
        url: '/layers',
      },
      toggleEffect: {
        effect: "drop",
        options: {
          direction: "left"
        },
        duration: 200
      },
      wide: {
        iconWidth: "1em",
        iconSpacing: "0.5em",
        levelOfs: "1.5em",
        labelSpacing: "0.5em"
      },
      select: _onSelect,
      init: _onInit,
      click: _onClick
    }
    var tree = element.find("#tree").fancytree(fancytreeOptions);
    scope.tree = tree.fancytree("getTree");
  }
  function _onInit(event, eventData) {
    var zoomLevel = MapService.getView().getZoom();
    if (zoomLevel === parseInt(zoomLevel, 10)) {
      eventData.tree.visit(function (node) {
        if (node.checkbox === false) {
          node.addClass("icon-padding");
        }
        if (node.data.preselected) {
          node.setSelected(true);
        }
        var minZoom = node.data.minZoom,
          maxZoom = node.data.maxZoom;
        if (!node.isFolder()) {
          if (minZoom != undefined) {
            if (minZoom < zoomLevel) {
              node.removeClass("layer-hidden");
            } else {
              node.addClass("layer-hidden");
            }
          }
        }
      });
    }
  }
  function _onSelect(event, eventData) {
    $timeout(function () {
      if (eventData.node.isFolder()) {
        var children = eventData.node.children;
        if (eventData.node.isSelected()) {
          children.forEach(function (layer) {
            layer.data.key = layer.data.key || layer.key;
            Layers.addLayer(layer.data);
            Legends.addLegend(layer);
          });
        } else {
          children.forEach(function (layer) {
            layer.data.key = layer.data.key || layer.key;
            Layers.removeLayer(layer.data)
            Legends.removeLegend(layer);
          });
        }
      } else {
        if (eventData.node.isSelected()) {
          eventData.node.data.key = eventData.node.data.key || eventData.node.key;
          Layers.addLayer(eventData.node.data);
          Legends.addLegend(eventData.node);
        } else {
          eventData.node.data.key = eventData.node.data.key || eventData.node.key;
          Legends.removeLegend(eventData.node);
          Layers.removeLayer(eventData.node.data)
        }
      }
    }, 1);
  }
  function _onClick(event, eventData) {
    if (eventData.targetType === 'icon' && !eventData.node.isFolder()) {
      var extent = ol.proj.transformExtent(eventData.node.data.extent, ol.proj.get('EPSG:27493'), 'EPSG:3857');
      MapService.getView().fit(extent, {
        duration: 1500
      });
    }
  }

  LayersTabController.$inject = ['$scope', 'Layers'];
  function LayersTabController($scope, Layers) {
    // Tree Controllers
    $scope.expandTree = expandTree
    $scope.collapseTree = collapseTree
    $scope.deselectAll = deselectAll
    function expandTree() {
      this.tree.visit(function (node) {
        node.setExpanded(true);
      });
    }
    function collapseTree() {
      this.tree.visit(function (node) {
        node.setExpanded(false);
      });
    }
    function deselectAll() {
      this.tree.visit(function (node) {
        node.setSelected(false);
      });
    }

    // Base Layer Controllers
    $scope.baseLayers = [
      {
        name: "Open Street Map",
        layerDef: new ol.layer.Tile({
          source: new ol.source.OSM({})
        })
      },
      {
        name: "Camada em Branco",
        layerDef: new ol.layer.Tile({})
      }]
    $scope.selectedBaseLayer = $scope.baseLayers[0]
    $scope.setBaseLayer = setBaseLayer
    function setBaseLayer(baseLayer) {
      $scope.selectedBaseLayer = baseLayer;
      Layers.setBaseLayer(baseLayer.layerDef);
    }
  }
}
angular
  .module('unicerApp')
  .directive('legendsTab', LegendsTab);

function LegendsTab() {
  var directive = {
    bindToController: true,
    controller: LegendsTabController,
    controllerAs: 'lgCtrl',
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/navigation/tabs/Tab-Legends.html'
  };
  return directive;
  
  LegendsTabController.$inject = ['$scope', 'LegendsService'];
  function LegendsTabController($scope, LegendsService) {
    $scope.groups = LegendsService.getLegends();
  }
}
angular
  .module('unicerApp')
  .directive('sideNav', SideNav);

function SideNav() {
  var directive = {
    bindToController: true,
    controller: SideNavController,
    controllerAs: 'SideNavCtrl',
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/navigation/navigation.html'
  };
  return directive;

  SideNavController.$inject = ['$rootScope', '$scope', 'SideNavService', 'MapService', '$timeout'];
  function SideNavController($rootScope, $scope, SideNavService, MapService, $timeout) {

    $scope.hideNavigation = SideNavService.hideNavigation;
    $scope.showNavigation = SideNavService.showNavigation;
    $scope.setActiveTab = SideNavService.setActiveTab;
    $scope.isActiveTab = SideNavService.isActiveTab;

    $scope.$watch(SideNavService.isVisible, _changeVisibility, false);
    function _changeVisibility(newVal, oldVal, scope) {
      scope.navigationVisibility = newVal;
      $rootScope.navigationVisibility = newVal;
      MapService.drawMap();
    };

  }
}
angular
  .module('unicerApp')
  .directive('printTab', PrintTab);

function PrintTab() {
  var directive = {
    bindToController: true,
    controller: PrintController,
    controllerAs: 'printCtrl',
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/navigation/tabs/Tab-Print.html'
  };
  return directive;


  PrintController.$inject = ['$scope', 'PrintManager'];

  function PrintController($scope, PrintManager) {
    $scope.printData = {};

    PrintManager.getPrintDefaults()
      .then(function (defaults) {
        $scope.defaults = defaults;
      });


    $scope.print = print;
    $scope.newPrint = newPrint;
    $scope.setPark = setPark;
    $scope.setContent = setContent;
    $scope.setSeason = setSeason;
    $scope.setYear = setYear;
    $scope.setFormat = setFormat;

    function print() {
      var data = $scope.printData;
      if (!_requiredFields()) {
        return;
      }
      $scope.isPrinting = true;
      switch (data.format.key) {
        case 'csv':
          PrintManager.getCSVLinks(data).then(_handleResults);
          break;
        case 'pdf':
          PrintManager.getPDFLinks(data).then(_handleResults);
          break;
      }
      function _handleResults(fileParams) {
        $scope.isPrinting = false;
        $scope.file = fileParams;
      }
    }
    function newPrint() {
      $scope.printData = {};
      $scope.printFilters = false;
      delete $scope.file;
    }

    function setPark(p) {
      $scope.printData.park = p;
    }
    function setContent(c) {
      $scope.printFilters = (c.key === 'interventions')
      $scope.printData.contentType = c;
    }
    function setSeason(s) {
      $scope.printData.season = s;
    }
    function setYear(y) {
      $scope.printData.year = y;
    }
    function setFormat(f) {
      $scope.printData.format = f;
    }

    function _requiredFields() {
      var errors = { size: 0 };
      var requiredFields = ['park', 'contentType', 'format'];
      requiredFields.map(function (field, index) {
        if (!$scope.printData.hasOwnProperty(field)) {
          errors[field] = true;
          errors.size++;
        }
      });
      if (errors.size > 0) {
        errors.message = "* Falta Preencher Campos Obrigatórios";
      }
      $scope.errors = errors;
      return errors.size === 0;
    }

    /* 

            PrintRequest.getRequestObject().then(function (data) {
              console.log(data);

              /*PrintHttp.print(JSON.stringify(data), function (err, url) {
                  if (err) console.log("There was an Error");
                  printCtrl.isPrinting = false;
                  printCtrl.file.name = values.content.value + "_" + values.parque.key + "_" + values.season.value + "_" + values.year.value;
                  printCtrl.file.url = url;
                  printCtrl.file.hasFile = true;
              });
            });
          }
        }
      });
    }

    }*/
  }
}
angular
  .module('unicerApp')
  .directive('printResult', PrintResult);

function PrintResult() {
  var directive = {
    restrict: 'E',
    scope: {
      icon: '@',
      url: '@',
      name: '@',
      params: '<',
      click: "&onClick"
    },
    template: "<a target='_blank' ng-href='{{url}}{{urlParams}}' ng-click='click()'> " +
    " <i class='print_result_icon fa {{icon || \"fa-file-o\"}}'></i>" +
    " <div class='print_result_text'>&nbsp;{{name}}<div>" +
    "<a/>",
    link: function (scope, element, attrs) {
      scope.$watch('params', function () {
        if (scope.params != undefined) {
          scope.urlParams = '?' + Object.keys(scope.params).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(scope.params[k])
          }).join('&');
        }
      });
    },
  };
  return directive;
}
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
angular
  .module('unicerApp')
  .service('InterventionsHttp', InterventionsHttp);

InterventionsHttp.$inject = ['$q', '$http', 'DirtyDataManager'];

function InterventionsHttp($q, $http, DirtyDataManager) {

  return {
    add: add,
    getAll: getAll,
    get: get,
    getFilteredInterventions: getFilter,
    update: update,
    close: close
  };

  function add(inter) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/trees/' + inter.id_tree + '/interventions',
      data: _prepareData(inter)
    }).then(function (response) {
      DirtyDataManager.setDirty();
      deferred.resolve(response.data);
    }, function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  function getAll() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/interventions'
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  function get(id) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'api/interventions/' + id
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  function getFilter(filter) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'api/interventions/filter',
      headers: {
        'Content-Type': 'application/json'
      },
      params: filter
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  function update(inter) {
    return _updateRequest(_prepareData(inter));
  }
  function close(inter) {
    return _updateRequest(inter);
  }

  function _updateRequest(inter) {
    var deferred = $q.defer();
    $http({
      method: 'PUT',
      url: 'api/interventions/' + inter.id,
      headers: {
        'Content-Type': 'application/json'
      },
      data: inter
    }).then(function successCallback(response) {
      DirtyDataManager.setDirty();
      deferred.resolve(response.data);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  function _prepareData(inter) {
    return Object.assign({}, inter, { id_type: inter.type.id });
  }

}
angular
  .module('unicerApp')
  .service('LayersHttp', LayersHttp);

LayersHttp.$inject = ['$q', '$http', 'GlobalURLs'];

function LayersHttp($q, $http, GlobalURLs) {

  return {
    fetch: fetch,
    fetchInfo: fetchInfo
  };

  function fetch(data) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: GlobalURLs.host+'/geoserver/wfs',
      params: data
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  }
  function fetchInfo(layer, coordinate, view) {
    var deferred = $q.defer();
    var url = layer.getSource().getGetFeatureInfoUrl(
      ol.proj.transform(coordinate, "EPSG:3857", ol.proj.get('EPSG:27493')),
      view.getResolution(),
      ol.proj.get('EPSG:27493'), {
        'INFO_FORMAT': 'application/json'
      });
    $http({
      method: 'GET',
      url: url
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  }

}
angular
  .module('unicerApp')
  .factory('ParksHttp', ParksHttp);

ParksHttp.$inject = ['$http', '$q'];

function ParksHttp($http, $q) {
  return {
    getParks: get
  };

  function get() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/locations'
    }).then(function successCallback(response) {
      deferred.resolve(response.data.features);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
}
angular
  .module('unicerApp')
  .service('PrintHttp', PrintHttp);

PrintHttp.$inject = ['GlobalURLs', '$q', '$http', '$timeout'];

function PrintHttp(GlobalURLs, $q, $http, $timeout) {

  return {
    printTrees: print,
    printInterventions: print
  };

  function print(requestData) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: GlobalURLs.print,
      data: requestData,
    })
      .then(function (response) {
        return response.data.statusURL;
      })
      .then(_checkStatus)
      .then(function (res) {
        deferred.resolve(GlobalURLs.host + res.downloadURL);
      })
      .catch(function (err) {
        deferred.reject(err);
      });
    return deferred.promise;
  }
  function _checkStatus(statusURL) {
    var deferred = $q.defer();
    _fetchData();
    function _fetchData() {
      $http({
        method: 'GET',
        url: GlobalURLs.host + statusURL
      }).then(function (res) {
        if (res.data.done) {
          deferred.resolve(res.data);
        } else {
          $timeout(function () {
            _fetchData();
          }, 1500);
        }
      });
    }
    return deferred.promise;
  }

};
angular
  .module('unicerApp')
  .service('TreesHttp', TreesHttp);

TreesHttp.$inject = ['$q', '$http'];

function TreesHttp($q, $http) {

  return {
    getTrees: getTrees,
    getTreeDetails: getTreeDetails,
    getTreeInterventions: getTreeInterventions
  };

  function getTrees() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/trees/'
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  function getTreeDetails(id_tree) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/trees/' + id_tree
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  function getTreeInterventions(id_tree) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/trees/' + id_tree + '/interventions'
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }

}
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
angular
  .module('unicerApp')
  .service('DirtyDataManager', DirtyDataManager);

function DirtyDataManager(){
  var dirtyTree = true,
      dirtyLayers = true;

  return {
    setDirty: setDataDirty,
    isLayerDirty: isTreeDirty,
    isTreeDirty: isTreeDirty,
    cleanTree: cleanTree,
    cleanLayer: cleanLayer
  };

  function setDataDirty(){
    dirtyTree = true;
    dirtyLayers = true;
  }
  function isLayerDirty(){
    return dirtyLayers;
  };
  function isTreeDirty(){
    return dirtyTree;
  };
  function cleanTree(){
    dirtyTree = false;
  };
  function cleanLayer(){
    dirtyLayers = false;
  };
}  
angular
  .module('unicerApp')
  .service('FilterSharedData', FilterSharedData);

function FilterSharedData() {
  var filterData = {};

  return {
    setFilter: set,
    getFilter: get
  }

  function set(filter) {
    filterData = filter;
  }
  function get() {
    return filterData;
  }

}
angular
  .module('unicerApp')
  .service('LayerIdentifier', LayerIdentifierService);

LayerIdentifierService.$inject = ['LayersHttp'];

function LayerIdentifierService(LayersHttp) {
  var promises = [];

  return {
    setLayers: setLayers,
    getLayers: getLayers
  };

  function setLayers(evt, view, layers) {
    promises.length = 0;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].isQueryable()) {
        promises.push(LayersHttp.fetchInfo(layers[i], evt.coordinate, view));
      }
    }
  }
  
  function getLayers(){
    return promises;
  }
}
angular
  .module('unicerApp')
  .service('Layers', Layers);

Layers.$inject = ['MapService', 'LayersHttp', 'WFSStyles', 'DirtyDataManager'];

function Layers(MapService, LayersHttp, WFSStyles, DirtyDataManager) {

  var layers = {};

  return {
    addLayer: addLayer,
    removeLayer: removeLayer,
    setBaseLayer: setBaseLayer
  }

  function addLayer(layerData, style) {
    if (layerData.type === 'WMS') {
      _addWMSLayer(layerData);
    } else if (layerData.type === 'TileWMS') {
      _addTiledWMSLayer(layerData);
    } else {
      _addWFSLayer(layerData, style);
    }
  }
  function removeLayer(layerData) {
    if (layers[layerData.key]) {
      MapService.getMap().removeLayer(layers[layerData.key]);
      layers[layerData.key].isVisible = false;
    }
  }
  function setBaseLayer(layer) {
    MapService.getMap().getLayers().setAt(0, layer);
  }

  function _addWFSLayer(layerData) {
    if (_checkLayer(layerData.key)) {
      var wfsLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          loader: function (extent) {
            var dataOptions = {
              service: 'WFS',
              version: '1.1.1',
              request: 'GetFeature',
              typename: layerData.workspace + ":" + layerData.name,
              srsname: 'EPSG:27493',
              outputFormat: 'application/json',
              bbox: ol.proj.transformExtent(extent, 'EPSG:3857', ol.proj.get('EPSG:27493')).join(',') + ',' + ol.proj.get('EPSG:27493').getCode(),
              format_options: 'id_policy:gid'
            }
            LayersHttp
              .fetch(dataOptions)
              .then(function (response) {
                wfsLayer
                  .getSource()
                  .addFeatures(
                  new ol.format.GeoJSON().readFeatures(response, {
                    featureProjection: 'EPSG:3857',
                    dataProjection: ol.proj.get('EPSG:27493')
                  }))
              });
          },
          strategy: ol.loadingstrategy.bbox,
          updateWhileAnimating: true
        })
      });
      wfsLayer.isVisible = true;
      if (layerData.style) {
        wfsLayer.setStyle(WFSStyles[layerData.style]);
      }
      if (layerData.opacity) {
        wfsLayer.setOpacity(layerData.opacity);
      }
      MapService.getMap().addLayer(wfsLayer);
      layers[layerData.key] = wfsLayer;
    } else {
      if (layerData.style) {
        layers[layerData.key].setStyle(WFSStyles[layerData.style]);
      }
      if (!layers[layerData.key].isVisible) {
        MapService.getMap().addLayer(layers[layerData.key]);
        layers[layerData.key].isVisible = true;
      }
    }
  }
  function _addWMSLayer(layerData) {
    var wmsLayer = new ol.layer.Image({
      opacity: layerData.opacity,
      source: new ol.source.ImageWMS({
        url: 'http://gistree.espigueiro.pt/geoserver/wms',
        params: {
          'LAYERS': layerData.workspace + ":" + layerData.name
        },
        extent: layerData.extent,
      }),
      minResolution: _calculateResolution(layerData.maxZoom),
      maxResolution: _calculateResolution(layerData.minZoom),
      group: layerData.group,
      queryable: layerData.queryable
    });
    MapService.getMap().addLayer(wmsLayer);
    layers[layerData.key] = wmsLayer;
  }
  function _addTiledWMSLayer(layerData) {
    var wmsLayer = new ol.layer.Tile({
      opacity: layerData.opacity,
      source: new ol.source.TileWMS({
        url: 'http://gistree.espigueiro.pt/geoserver/wms',
        params: {
          'LAYERS': layerData.workspace + ":" + layerData.name
        },
        extent: layerData.extent,
      }),
      minResolution: _calculateResolution(layerData.maxZoom),
      maxResolution: _calculateResolution(layerData.minZoom),
      group: layerData.group,
      queryable: layerData.queryable
    });
    MapService.getMap().addLayer(wmsLayer);
    layers[layerData.key] = wmsLayer;
  }

  function _checkLayer(layer_key) {
    return !layers.hasOwnProperty(layer_key);
  }
  function _calculateResolution(zoomLevel) {
    if (typeof zoomLevel == 'undefined') {
      return zoomLevel;
    } else {
      return Math.floor(156543.04 / (Math.pow(2, zoomLevel)));
    }
  };

}
angular
  .module('unicerApp')
  .service('MapService', MapService);

MapService.$inject = ['$timeout'];

function MapService($timeout) {

  var map;
  var defaultInteractions = [
    new ol.interaction.MouseWheelZoom()];
  var defaultControls = [
    new ol.control.ScaleLine(),
    new ol.control.OverviewMap({
      className: 'ol-overviewmap ol-custom-overviewmap',
      layers: [
        new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://gistree.espigueiro.pt/geoserver/wms',
            params: {
              'LAYERS': 'unicer:limite'
            },
            extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
          }),
        }),
        new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://gistree.espigueiro.pt/geoserver/wms',
            params: {
              'LAYERS': 'unicer:base'
            },
            extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
          }),
        }),
        new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://gistree.espigueiro.pt/geoserver/wms',
            params: {
              'LAYERS': 'unicer:edificios'
            },
            extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
          }),
        })
      ],
      collapseLabel: '\u002D',
      label: '\u002B',
      collapsed: false,
      tipLabel: ''
    }),
    new ol.control.MousePosition({
      coordinateFormat: function (coord) {
        return ol.coordinate.format(coord, " {x} , {y} ", 4);
      },
      projection: 'EPSG:4326',
      className: '',
      undefinedHTML: '&nbsp;'
    }),
    new ol.control.MousePosition({
      coordinateFormat: function (coord) {
        return ol.coordinate.format(coord, " {x} , {y} ", 4);
      },
      projection: ol.proj.get('EPSG:27493'),
      className: '',
      undefinedHTML: '&nbsp;'
    })];
  var defaultOptions = {
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({}),
        queryable: false
      })
    ],
    interactions: [],
    controls: [],
    view: new ol.View({
      center: ol.proj.transform([-7.593569, 41.595564], 'EPSG:4326', 'EPSG:3857'),
      zoom: 11,
      minZoom: 11
    })
  };

  return {
    init: mapInitialization,
    getMap: getMap,
    getView: getView,
    getControls: getControls,
    getInteractions: getInteractions,
    resetView: resetView,
    zoomToCoordinate: zoomToCoordinate,
    drawMap: drawMap,
    reloadLayers: reloadLayers
  };

  function mapInitialization(options) {
    var mapOptions = angular.extend(defaultOptions, options);
    if (!map) {
      map = new ol.Map(mapOptions);
      for (var i = 0; i < defaultInteractions.length; i++) {
        map.addInteraction(defaultInteractions[i]);
      }
      $timeout(function () {
        for (var i = 0; i < defaultControls.length; i++) {
          map.addControl(defaultControls[i]);
        }
      })
    }
  }
  function getMap() {
    return map;
  }
  function getView() {
    return map.getView();
  }
  function getControls() {
    return map.getControls();
  }
  function getInteractions() {
    return map.getInteractions();
  }
  function resetView() {
    var newView = new ol.View({
      center: ol.proj.transform([-7.593569, 41.595564], 'EPSG:4326', 'EPSG:3857'),
      zoom: 11,
      minZoom: 11
    });
    map.setView(newView);
  }
  function zoomToCoordinate(coordinate, projection) {
    var proj = projection || 'EPSG:4326';
    map.getView().animate({
      center: ol.proj.transform(coordinate, ol.proj.get(proj), 'EPSG:3857'),
      duration: 1000,
      zoom: 16
    });
  }
  function drawMap() {
    $timeout(function () {
      map.setTarget(document.getElementById('map'));
      map.updateSize();
    }, 200);
  }
  function reloadLayers() {
    map.getLayers().forEach(function (layer) {
      if (layer instanceof ol.layer.Vector) {
        layer.getSource().clear();
      }
    });
  }

}
angular
  .module('unicerApp')
  .service('MapInteractionsService', MapInteractionsService);

MapInteractionsService.$inject = ['MapService', 'LayerIdentifier', 'WFSStyles'];

function MapInteractionsService(MapService, LayerIdentifier, WFSStyles) {
  var mapInteractions = MapService.getInteractions();
  var activeInteraction = {};
  var selectInteraction = new ol.interaction.Select({
    style: WFSStyles.treeSelected
  });
  setActiveInteraction('DragPan');
  MapService.getMap().addInteraction(selectInteraction);

  return {
    setActiveInteraction: setActiveInteraction,
    getActiveInteraction: getActiveInteraction,
    isActive: isActive,
    setDefaultView: setDefaultView,
    zoomTo: zoomTo,
    getSelectInteraction: getSelectInteraction
  }

  function setActiveInteraction(interaction) {
    switch (interaction) {
      case 'DragPan':
        activeInteraction = new ol.interaction.DragPan({});
        activeInteraction.text = 'Mover Mapa';
        break;
      case 'ZoomIn':
        activeInteraction = new ol.interaction.Pointer({
          handleDownEvent: function (e) {
            var view = MapService.getView();
            view.setCenter(e.coordinate);
            view.setZoom(view.getZoom() + 1);
          }
        });
        activeInteraction.text = 'Aproximar Mapa';
        break;
      case 'ZoomOut':
        activeInteraction = new ol.interaction.Pointer({
          handleDownEvent: function (e) {
            var view = MapService.getView();
            view.setCenter(e.coordinate);
            view.setZoom(view.getZoom() - 1);
          }
        })
        activeInteraction.text = 'Afastar Mapa';
        break;
      case 'ZoomBox':
        activeInteraction = new ol.interaction.DragZoom({
          condition: ol.events.condition.always,
          className: 'drag_zoom_box'
        })
        activeInteraction.text = 'Fazer Zoom de Caixa';
        break;
      case 'Identify':
        activeInteraction = new ol.interaction.Pointer({
          handleDownEvent: function (evt) {
            LayerIdentifier.setLayers(evt, evt.map.getView(), evt.map.getLayers().getArray());
          }
        });
        activeInteraction.text = 'Identificar Camadas';
        break;
    }
    activeInteraction.type = interaction;
    mapInteractions.setAt(1, activeInteraction);
  }
  function getActiveInteraction() {
    return activeInteraction.text;
  }
  function isActive(type) {
    return activeInteraction.type === type;
  }
  function setDefaultView() {
    MapService.resetView();
  }
  function zoomTo(coordinate, proj) {
    MapService.zoomToCoordinate(coordinate, proj);
  }
  function getSelectInteraction() {
    return selectInteraction;
  }



}
angular
  .module('unicerApp')
  .service('PrintManager', PrintManager);

PrintManager.$inject = [
  '$q',
  'ParksHttp',
  'PrintHttp',
  'TreesHttp',
  'InterventionsHttp',
  'DefaultInterventionData',
];

function PrintManager($q, ParksHttp, PrintHttp, TreesHttp, InterventionsHttp, Defaults) {

  return {
    getPrintDefaults: getPrintDefaults,
    getCSVLinks: getCSVLinks,
    getPDFLinks: getPDFLinks
  };

  function getPrintDefaults() {
    return ParksHttp.getParks().then(function (parks) {
      return {
        parks: parks,
        seasons: Defaults.getSeasons(),
        years: Defaults.getYears(),
        contentTypes: [
          {
            key: 'trees',
            value: "Árvores"
          },
          {
            key: 'interventions',
            value: "Intervenções"
          }],
        formats: [
          {
            key: 'csv',
            value: ".csv (Comma Separated Values)"
          }, {
            key: "pdf",
            value: ".pdf (Printable Document Format)"
          }]
      }
    });
  }
  function getCSVLinks(params) {
    var deferred = $q.defer();
    var data = {
      url: 'print/csv/' + params.contentType.key,
      name: params.contentType.value + '.csv',
      params: {
        park: params.park.properties.nome 
      },
      icon: 'fa-file-excel-o'
    };
    if (params.season) data.params.season = params.season;
    if (params.year) data.params.year = params.year;
    deferred.resolve(data);
    return deferred.promise;
  }
  function getPDFLinks(params) {
    var requestData = _getDefaultRequestData();

    requestData.params = params;
    
    requestData.attributes.map.center = ol.proj.toLonLat(params.park.geometry.coordinates);
    requestData.attributes.parque = params.park.properties.nome;

    if (params.contentType.key === "trees") {
      requestData.layout = "arvores";
      requestData.outputFilename = "Árvores";
      requestData.attributes.subtitle = "Impressão de Árvores";
      return _getTreeLink(requestData).then(function (downloadURL) {
        return {
          name: 'Árvores.pdf',
          url: downloadURL,
          icon: 'fa-file-pdf-o'
        }
      });
    } else {
      requestData.layout = "inter";
      requestData.outputFilename = "Intervenções";
      requestData.attributes.subtitle = "Impressão de Intervenções";
      requestData.attributes.map.layers[0].styles = ["", "", "", "treeIntervention"];
      return _getInterventionsLink(requestData).then(function (downloadURL) {
        return {
          name: 'Intervenções.pdf',
          url: downloadURL,
          icon: 'fa-file-pdf-o'
        }
      })
    }
  }

  function _getDefaultRequestData() {
    return {
      outputFormat: "pdf",
      attributes: {
        title: "Gestree - Gestão",
        map: {
          longitudeFirst: true,
          scale: 4000,
          projection: "EPSG:4326",
          dpi: 254,
          height: 550,
          width: 500,
          rotation: 0,
          layers: [
            {
              type: "WMS",
              baseURL: "http://localhost/geoserver/wms",
              layers: [
                "unicer:base",
                "unicer:limite",
                "unicer:edificios",
                "unicer:arvores"
              ],
              serverType: "geoserver"
            }
          ]
        },
        datasource: []
      }
    }
  }
  function _getTreeLink(requestData) {
    return TreesHttp.getTrees()
      .then(_getTreeTable)
      .then(function (datasource) {
        requestData.attributes.datasource.push({ title: "Árvores" });
        requestData.attributes.datasource[0].table = datasource;
        return requestData;
      }).then(function (requestData) {
        return PrintHttp.printTrees(requestData);
      });
  }
  function _getTreeTable(trees) {
    var columns = [], data = [];
    var genericTree = trees[0];
    for (var attr in genericTree) {
      columns.push(attr);
    };
    for (var i = 0; i < trees.length; i++) {
      var treeData = [];
      for (var treeAttr in trees[i]) {
        treeData.splice(
          columns.findIndex(function (el) {
            return el === treeAttr;
          }), 0, trees[i][treeAttr]);
      }
      data.push(treeData);
    }
    return {
      columns: columns,
      data: data
    };
  }
  function _getInterventionsLink(requestData) {
    var filter = {};
    if (requestData.params.hasOwnProperty('season')) {
      filter.season = requestData.params.season;
    }
    if (requestData.params.hasOwnProperty('year')) {
      filter.year = requestData.params.year;
    }
    return InterventionsHttp.getFilteredInterventions(filter)
      .then(_getInterventionsTable)
      .then(function (datasource) {
        requestData.attributes.datasource = datasource;
        return requestData;
      })
      .then(function (requestData) {
        return PrintHttp.printInterventions(requestData);
      });
  }
  function _getInterventionsTable(interventions) {
    var columns = [];
    var datasource = [];
    var genericIntervention = interventions[0];
    for (var attr in genericIntervention) {
      columns.push(attr);
    }
    for (var i = 0; i < interventions.length; i++) {
      var interventionsData = [];
      var id_tree = interventions[i].id_tree;
      var hasTree = datasource.findIndex(function (el) {
        return el.id_tree === id_tree;
      })
      for (var interventionsAttr in interventions[i]) {
        interventionsData.splice(
          columns.findIndex(function (el) {
            return el === interventionsAttr;
          }), 0, interventions[i][interventionsAttr]);
      };
      if (hasTree === -1) {
        datasource.push({
          id_tree: id_tree,
          table: {
            columns: columns,
            data: [interventionsData]
          }
        });
      } else {
        datasource[hasTree].table.data.push(interventionsData);
      }
    }
    return datasource;
  }
}  
angular
  .module('unicerApp')
  .service('SideNavService', SideNavService);

function SideNavService() {

  var isVisible = true;
  var activeTab = 1;
  var lastActiveTab;

  return {
    isVisible: getVisibility,
    showNavigation: showNavigation,
    hideNavigation: hideNavigation,
    setActiveTab: setActiveTab,
    getActiveTab: getActiveTab,
    isActiveTab: isActiveTab,
    hide: hide,
    show: show
  }

  function getVisibility() {
    return isVisible;
  }
  function showNavigation() {
    isVisible = true;
  }
  function hideNavigation() {
    isVisible = false;
  }

  function setActiveTab(tab) {
    activeTab = tab;
  }
  function getActiveTab(){
    return activeTab;
  }
  function isActiveTab(tab){
    return activeTab === tab;
  }

  function hide(){
    lastActiveTab = activeTab;
    setActiveTab(null);
  }
  function show(){
    setActiveTab(lastActiveTab);
  }

}  
angular
  .module('unicerApp')
  .service('TreeDetailsService', TreeDetailsService);

TreeDetailsService.$inject = ['$q', 'TreesHttp', '$rootScope', 'DirtyDataManager'];

function TreeDetailsService($q, TreesHttp, $rootScope, Dirty) {

  var selectedTree;

  return {
    getTreeDetails: getTreeDetails,
    getSelectedTree: getSelectedTree,
    getTree: getTree
  }

  function getTreeDetails(evt) {
    var deferred = $q.defer();
    if (evt && evt.selected.length !== 0) {
      getTree(evt.selected[0].getId());
    } else {
      $rootScope.$apply(function () {
        selectedTree = undefined;
      })
    }
  }
  function getSelectedTree() {
    return selectedTree;
  }
  function getTree(treeID) {
    TreesHttp.getTreeDetails(treeID).then(function (tree) {
      selectedTree = tree;
      Dirty.cleanTree();
    });
  }

}  
angular
  .module('unicerApp')
  .service('SortingService', SortingService);

SortingService.$inject = ['DefaultInterventionData'];

function SortingService(Defaults){

  return {
    orderBySeasonYear: orderBySeasonYear
  };

  function orderBySeasonYear(intervention) {
    var date = new Date(
      intervention.year,
      Defaults.getSeasons().indexOf(intervention.season) + 3,
      1
    );
    return date.getTime();
  }
}  
angular
  .module('unicerApp')
  .service('WFSStyles', WFSStyles);

function WFSStyles() {

  var _styles = {
    defaultStyle: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({
          color: [24, 72, 26, 0.8]
        }),
        stroke: new ol.style.Stroke({
          color: [0, 0, 0, 1]
        }),
      })
    }),
    selected: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 4,
        fill: new ol.style.Fill({
          color: [72, 24, 70, 1]
        }),
        stroke: new ol.style.Stroke({
          color: [0, 0, 0, 1],
          width: 2
        }),
      }),
      zIndex: 100
    }),
    intervention: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 4,
        fill: new ol.style.Fill({
          color: [72, 15, 15, 1]
        }),
        stroke: new ol.style.Stroke({
          color: [0, 0, 0, 1],
          width: 2
        })
      }),
      zIndex: 50
    })
  };

  return {
    treeSelected: treeSelected,
    treeDefault: treeDefault,
    treeIntervention: treeIntervention,
    treeHighlight: treeHighlight
  }

  function treeSelected(){
    return _styles.selected;
  }
  function treeDefault() {
    return _styles.defaultStyle;
  }
  function treeIntervention(feature, layer) {
    return feature.getProperties().has_inter ? _styles.intervention : _styles.defaultStyle;
  }
  function treeHighlight(selectedFeatureID) {
    return function (feature, layer) {
      return selectedFeatureID === feature.getId() ? _styles.selected : _styles.defaultStyle;
    }
  }

}