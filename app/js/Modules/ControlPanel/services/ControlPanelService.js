(function () {
    'use strict';

    angular
        .module('ControlPanelModule')
        .service('ControlPanelService', ControlPanelService);

    function ControlPanelService() {
        var tabs = [];
        this.addTab = _addTab;
        this.getTabs = _getTabs;

        function _addTab(tab) {
            tabs.push(tab);
        };

        function _getTabs() {
            return tabs;
        }
    }
})();