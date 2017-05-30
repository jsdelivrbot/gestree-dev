(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .directive('mainInterventions', mainInterventions);

    mainInterventions.$inject = ['InterventionsService', 'FilterService'];

    function mainInterventions(InterventionsService, FilterService) {
        var directive = {
            bindToController: true,
            controller: InterventionsCtrl,
            controllerAs: 'intCtrl',
            link: link,
            restrict: 'E',
            scope: {},
            templateUrl: 'views/templates/interventions.html'
        };
        return directive;

        // Data Access Should be done in the link function
        function link(scope, element, attrs) {
            InterventionsService.getAllInterventions()
                .then(function (interventions) {
                    scope.interventions = interventions;
                })
                .catch(function (err) {
                    console.error(err);
                });
            scope.$watch(function () {
                return FilterService.getFilter();
            }, function (newVal, oldVal) {
                scope.interFilter = newVal;
            }, true);
        }
    }

    InterventionsCtrl.$inject = ["$scope"];
    /* @ngInject */
    function InterventionsCtrl($scope) {
        var intCtrl = this;
        init();

        function init() {}
    }
})();