(function () {
    'use strict';

    angular
        .module('LegendsModule')
        .directive('legendsTab', Legends);

    function Legends() {
        var directive = {
            bindToController: true,
            controller: LegendsController,
            controllerAs: 'lgCtrl',
            restrict: 'E',
            scope: {},
            templateUrl: 'views/templates/control-panel/legendsTab.html'
        };
        return directive;
    }
    /* @ngInject */
    LegendsController.$inject = ['LegendsService'];
    function LegendsController(LegendsService) {
        this.groups = LegendsService.groups;
    }
})();