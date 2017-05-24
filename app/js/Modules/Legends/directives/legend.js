(function () {
    'use strict';

    angular
        .module('LegendsModule')
        .directive('legend', Legend);

    function Legend() {
        var directive = {
            bindToController: true,
            controller: LegendController,
            controllerAs: 'lgCtrl',
            restrict: 'A',
            scope: {
                title: '@',
            },
            transclude: true,
            templateUrl: 'views/templates/legend.html'
        };
        return directive;
    }
    /* @ngInject */
    function LegendController() {
        
    }
})();