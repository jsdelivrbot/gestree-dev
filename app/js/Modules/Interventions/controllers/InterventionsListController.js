(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .controller('InterventionsListController', InterventionsListController);

    InterventionsListController.$inject = ['$scope', 'FilterDataService', '$filter', 'Interventions'];

    function InterventionsListController($scope, FilterDataService, $filter, Interventions) {
        var intListCtrl = this;
        var interFilter = {};
        var interDateFilter = {};

        console.log("REACHED HERE!");

        $scope.$watch(function () {
            return FilterDataService.getFilter();
        }, function (newVal, oldVal) {
            interFilter = newVal;
            _callFilter();
        }, true);

        $scope.$watch(function () {
            return FilterDataService.getFilterDate();
        }, function (newVal, oldVal) {
            interDateFilter = newVal;
            _callFilter();
        }, true);

        init();

        function init() {
            $scope.allInterventions = Interventions;
            $scope.interventions = Interventions;
            _callFilter();
        }

        function _callFilter() {
            $scope.interventions = $filter('filter')($scope.allInterventions, interFilter);
            $scope.interventions = $filter('dateFilter')($scope.interventions, 'created_at', interDateFilter.createdAtStart, interDateFilter.createdAtEnd);
            $scope.interventions = $filter('dateFilter')($scope.interventions, 'intervention_date', interDateFilter.interventionStart, interDateFilter.interventionEnd);
            $scope.interventions = $filter('dateFilter')($scope.interventions, 'finished_at', interDateFilter.finishedAtStart, interDateFilter.finishedAtEnd);
        }
    }
})();