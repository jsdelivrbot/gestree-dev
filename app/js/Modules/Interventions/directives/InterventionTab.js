(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .directive('interventionsTab', Interventions);

    function Interventions() {
        var directive = {
            bindToController: true,
            controller: InterventionsTabController,
            controllerAs: 'intTabCtrl',
            restrict: 'E',
            scope: {},
            templateUrl: 'views/templates/control-panel/interventionsTab.html'
        };
        return directive;

    }
    /* @ngInject */
    InterventionsTabController.$inject = ["$scope", "InterventionTypesFactory", "FilterDataService"];

    function InterventionsTabController($scope, InterventionTypesFactory, FilterDataService) {
        var tbInCtrl = this;
        $scope.filterData = {};
        $scope.filterDate = {};

        tbInCtrl.setPriority = function (p) {
            $scope.filterData.priority = p;
        }

        tbInCtrl.setInterType = function (t) {
            tbInCtrl.selInterType = t;
            $scope.filterData.id_type = t;
        }

        tbInCtrl.resetFilter = function () {
            $scope.filterData = {};
            $scope.filterDate = {};
            tbInCtrl.selInterType = "--";
        }

        init();

        function init() {
            InterventionTypesFactory.get().then(function (d) {
                tbInCtrl.interTypes = d;
                tbInCtrl.selInterType = "--";
            });

            $scope.$watch('filterData', function (newVal, oldVal) {
                FilterDataService.setFilter(newVal);
            }, true);

            $scope.$watch('filterDate', function (newVal, oldVal) {
                FilterDataService.setFilterDate(newVal);
            }, true);
        }
    }
})();