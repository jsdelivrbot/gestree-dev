(function () {
    'use strict';

    angular.module('unicerApp', [
            'ngMaterial',
            'ngMessages',
            'ngRoute',
            'LegendsModule',
            'MapModule',
            'InterventionsModule',
            'ControlPanelModule',
            'MainModule',
            /*'PrintingModule',
            'SearchLocationModule',
            'BaseDocumentalModule',
            'ngDialog'*/
        ])
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
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
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