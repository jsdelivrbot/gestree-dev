(function () {
    'use strict';

    angular
        .module('MainModule', ['unicerApp.configs'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/templates/main.html',
                    controller: ['Map', function (Map) {
                        Map.setTarget("map");
                    }]
                })
                .when('/interv', {
                    templateUrl: 'views/templates/interventions/interventionsList.html',
                    controller: 'InterventionsListController',
                    controllerAs: 'intListCtrl',
                    resolve: {
                        Interventions: ['InterventionsService', _getInterventions]
                    }
                })
                .when('/interv/:int_id/edit', {
                    templateUrl: 'views/templates/interventions/edit.html',
                    controller: 'EditInterventionController',
                    controllerAs: 'editCtrl',
                    resolve: {
                        intervention: ['$route', 'InterventionsService', _getIntervention],
                        interTypes: ['InterventionTypesFactory', _getInterventionTypes]
                    }
                })
                .when('/interv/:int_id/close', {
                    templateUrl: 'views/templates/interventions/close.html',
                    controller: 'CloseInterventionController',
                    controllerAs: 'closeCtrl',
                    resolve: {
                        intervention: ['$route', 'InterventionsService', _getIntervention]
                    }
                })
                .when('/interv/:int_id/info', {
                    templateUrl: 'views/templates/interventions/info.html',
                    controller: 'MoreInfoContoller',
                    controllerAs: 'moreInfoCtrl',
                    resolve: {
                        intervention: ['$route', 'InterventionsService', _getIntervention]
                    }
                }).otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);
        }])
        .run(['Map', function (Map) {
            Map.setTarget("map");
        }]);

    function _getInterventions(InterventionsService) {
        return InterventionsService.getAllInterventions();
    }

    function _getIntervention($route, InterventionsService) {
        return InterventionsService.getIntervention($route.current.params.int_id);
    }

    function _getInterventionTypes(InterventionTypesFactory) {
        return InterventionTypesFactory.get();
    }
})();