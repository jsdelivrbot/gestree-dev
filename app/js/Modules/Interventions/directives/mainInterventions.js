(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .directive('mainInterventions', mainInterventions);

    mainInterventions.$inject = ['InterventionsService', 'FilterDataService', '$filter'];

    function mainInterventions(InterventionsService, FilterDataService, $filter) {
        var directive = {
            bindToController: true,
            controller: InterventionsCtrl,
            controllerAs: 'intCtrl',
            link: link,
            restrict: 'E',
            scope: {
            },
            templateUrl: 'views/templates/interventions.html'
        };
        return directive;

        // Data Access Should be done in the link function
        function link(scope, element, attrs) {
            var interFilter = {};
            var interDateFilter = {};

            InterventionsService.getAllInterventions()
                .then(function (interventions) {
                    scope.allInterventions = interventions;
                    scope.interventions = interventions;
                })
                .catch(function (err) {
                    console.error(err);
                });

            scope.$watch(function () {
                return FilterDataService.getFilter();
            }, function (newVal, oldVal) {
                interFilter = newVal;
                _callFilter();
            }, true);

            scope.$watch(function () {
                return FilterDataService.getFilterDate();
            }, function (newVal, oldVal) {
                interDateFilter = newVal;
                _callFilter();
            }, true);

            function _callFilter() {
                scope.interventions = $filter('filter')(scope.allInterventions, interFilter);
                scope.interventions = $filter('dateFilter')(scope.interventions, 'created_at', interDateFilter.createdAtStart, interDateFilter.createdAtEnd);
                scope.interventions = $filter('dateFilter')(scope.interventions, 'intervention_date', interDateFilter.interventionStart, interDateFilter.interventionEnd);
                scope.interventions = $filter('dateFilter')(scope.interventions, 'finished_at', interDateFilter.finishedAtStart, interDateFilter.finishedAtEnd);
            }
        }
    }

    InterventionsCtrl.$inject = ["$scope"];
    /* @ngInject */
    function InterventionsCtrl($scope) {
        var intCtrl = this;
        init();
        
        function init() {

        }
    }
})();