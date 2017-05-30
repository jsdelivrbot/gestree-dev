(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .controller('TabInterventionsController', TabInterventionsController);

    TabInterventionsController.$inject = ["$scope", "InterventionsTypeFactory", "FilterService"];

    function TabInterventionsController($scope, InterventionsTypeFactory, FilterService) {
        var tbInCtrl = this;
        $scope.filterData = {};

        tbInCtrl.setPriority = function (p) {
            $scope.filterData.priority = p;
        }

        tbInCtrl.setInterType = function (t) {
            tbInCtrl.selInterType = t;
            $scope.filterData.id_type = t;
        }

        tbInCtrl.resetFilter = function () {
            $scope.filterData = {};
            tbInCtrl.selInterType = "--";
        }

        init();

        function init() {
            InterventionsTypeFactory.get().then(function (d) {
                tbInCtrl.interTypes = d;
                tbInCtrl.selInterType = "--";
            });

            $scope.$watch('filterData', function (newVal, oldVal) {
                FilterService.setFilter(newVal);
            }, true);
        }
    }
})();