(function () {
    'use strict';

    angular
        .module('ControlPanelModule')
        .controller('ControlPanelController', ControlPanel);

    ControlPanel.$inject = ['ControlPanelService', '$scope'];

    function ControlPanel(ControlPanelService, $scope) {
        var cPanelCtrl = this;

        cPanelCtrl.hidePanel = function () {
            $scope.$emit("controlPanel:panelVisibility", false);
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
            cPanelCtrl.tabs = ControlPanelService.getTabs();
        }
    }
})();