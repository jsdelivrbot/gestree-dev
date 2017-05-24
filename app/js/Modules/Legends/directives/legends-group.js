(function () {
    'use strict';

    angular
        .module('LegendsModule')
        .directive('legendsGroup', LegendsGroup);

    function LegendsGroup() {
        var directive = {
            bindToController: true,
            controller: LegendsController,
            controllerAs: 'lgCtrl',
            restrict: 'E',
            scope: {},
            templateUrl: 'views/templates/legends.html'
        };
        return directive;
    }
    /* @ngInject */
    LegendsController.$inject = ['LegendsService'];
    function LegendsController(LegendsService) {
        this.groups = LegendsService.groups;
    }
})();