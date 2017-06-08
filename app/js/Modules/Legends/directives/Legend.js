(function () {
    'use strict';

    angular
        .module('LegendsModule')
        .directive('legendItem', LegendItem);

    function LegendItem() {
        var directive = {
            restrict: 'A',
            scope: {
                title: '@',
            },
            transclude: true,
            templateUrl: 'views/templates/legendItem.html'
        };
        return directive;
    }
})();