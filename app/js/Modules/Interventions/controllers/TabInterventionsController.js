(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .controller('TabInterventionsController', TabInterventionsController);

    TabInterventionsController.$inject = ["$scope", "InterventionsTypeFactory", "FilterDataService"];

    function TabInterventionsController($scope, InterventionsTypeFactory, FilterDataService) {
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
            InterventionsTypeFactory.get().then(function (d) {
                tbInCtrl.interTypes = d;
                tbInCtrl.selInterType = "--";
            });
            
            $scope.$watch('filterData', function (newVal, oldVal) {
                FilterDataService.setFilter(newVal);
            }, true);

            $scope.$watch('filterDate', function(newVal, oldVal) {
                FilterDataService.setFilterDate(newVal);
            }, true);
        }
    }
})();