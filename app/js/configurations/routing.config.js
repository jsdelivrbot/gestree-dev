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
      .when('/tree/:parque/:gid/interventions', {
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
  var selectedTree = {};
  selectedTree.id = $route.current.params.gid;
  selectedTree.parque = $route.current.params.parque;
  return TreesHttp.getTreeInterventions(selectedTree);
}