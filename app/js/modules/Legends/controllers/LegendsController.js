(function () {
    'use strict';

    angular
        .module('LegendsModule')
        .controller('LegendsController', LegendsController);

    LegendsController.$inject = ['$scope', 'LegendsService'];

    function LegendsController($scope, LegendsService) {
        $scope.groups = LegendsService.groups;
    }
})();