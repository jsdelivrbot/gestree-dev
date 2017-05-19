(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('PagesController', PagesController);

    PagesController.$inject = ['$scope'];

    function PagesController($scope) {
        var pagesCtrl = this;
        activate();
        this.activeTab = function (tab) {
            return tab == pagesCtrl.active;
        }
        this.nextPage = function (valid) {
            if (valid) {
                pagesCtrl.active++;
            }
        }

        $scope.$on('resetPrinting', function () {
            pagesCtrl.active = 1;
        });

        function activate() {
            pagesCtrl.active = 1;
        }
    }
})();