(function () {
    'use strict';

    angular
        .module('ControlPanelModule')
        .controller('ControlPanelController', ControlPanel);

    ControlPanel.$inject = ['$rootScope', '$scope'];

    function ControlPanel($rootScope, $scope) {
        var cPanelCtrl = this;

        cPanelCtrl.hidePanel = function () {
            $scope.$emit("changePanelVisibility", false);
        };

        cPanelCtrl.setActiveTab = function (id, mapVisibility) {
            cPanelCtrl.active = id;
        };

        cPanelCtrl.isActiveTab = function (id) {
            return cPanelCtrl.active === id;
        };

        init();
        function init() {
            cPanelCtrl.active = 1;
            cPanelCtrl.tabs = [{
                    id: 1,
                    name: "Camadas",
                    tooltip: "Camadas",
                    iconClass: "my-icon-camadas",
                    location: "/"
                },
                {
                    id: 2,
                    name: "Legendas",
                    tooltip: "Legendas",
                    iconClass: "my-icon-legends",
                    location: "/"
                },
                {
                    id: 3,
                    name: "Intervenções",
                    tooltip: "Intervenções",
                    iconClass: "my-icon-tree",
                    location: "/interv"
                }
            ];

        }
    }
})();