(function () {
    'use strict';

    angular
        .module('ControlPanelModule')
        .controller('ControlPanelController', ControlPanel);

    ControlPanel.$inject = ['$rootScope', '$scope'];

    function ControlPanel($rootScope, $scope) {
        var cPanelCtrl = this;

        cPanelCtrl.showMap = function () {
            $rootScope.mapVisibility = true;
        };

        cPanelCtrl.hideMap = function () {
            $rootScope.mapVisibility = false;
        };

        cPanelCtrl.hideMenu = function () {
            $rootScope.menuIsHidden = true;
        };

        init();
        
        function init() {
            $rootScope.mapVisibility = true;
        }
    }
})();