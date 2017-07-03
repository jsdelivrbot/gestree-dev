(function() {
    'use strict';

    angular
        .module('PrintModule')
        .directive('printTab', PrintTab);

    function PrintTab() {
        var directive = {
            bindToController: true,
            controller: 'PrintController',
            controllerAs: 'printCtrl',
            link: link,
            restrict: 'E',
            scope: {},
            templateUrl: 'views/templates/control-panel/printTab.html'
        };
        return directive;
        
        function link(scope, element, attrs) {

        }
    }
})();