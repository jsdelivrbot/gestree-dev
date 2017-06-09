(function () {
    'use strict';
    angular
        .module('ControlPanelModule')
        .directive('controlPanel', ControlPanelDirective);

    function ControlPanelDirective() {
        var directive = {
            bindToController: true,
            controller: 'ControlPanelController',
            controllerAs: 'cPanelCtrl',
            restrict: 'E',
            templateUrl: 'views/templates/control-panel/controlPanel.html'
        };
        return directive;
    }
})();