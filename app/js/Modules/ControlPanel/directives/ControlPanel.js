(function () {
    'use strict';
    angular
        .module('ControlPanelModule')
        .directive('controlPanel', Directive);

    Directive.$inject = ['Map', 'LayersFactory', 'LegendsService', '$timeout'];

    function Directive(Map, Layers, Legends, $timeout) {
        var directive = {
            bindToController: true,
            controller: 'ControlPanelController',
            controllerAs: 'cPanelCtrl',
            link: link,
            restrict: 'E',
            scope: {
                menuIsHidden: "="
            },
            templateUrl: 'views/templates/control-panel/controlPanel.html'
        };
        return directive;

        function link(scope, element, attrs) {    
        }
    }
})();