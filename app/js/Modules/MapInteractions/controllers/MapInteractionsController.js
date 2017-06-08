(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .controller('MapInteractionsController', MapInteractionsController);

    MapInteractionsController.$inject = ['$rootScope', '$scope', '$timeout', 'MapInteractionsService', 'Map'];

    function MapInteractionsController($rootScope, $scope, $timeout, MapInteractionsService, Map) {
        var MapInterCtrl = this;

        MapInteractionsService.setMapInteraction('DragPan');

        MapInterCtrl.search = false;
        MapInterCtrl.isActive = function (active) {
            return MapInterCtrl.active == active;
        }
        MapInterCtrl.setDefaultView = function (a) {
            Map.setDefaultView();
        };
        MapInterCtrl.setInteraction = function (interaction) {
            MapInteractionsService.setMapInteraction(interaction);
        };
        MapInterCtrl.showMenu = function () {
            $rootScope.menuIsHidden = false;
        };
        MapInterCtrl.showSearchBar = function () {
            MapInterCtrl.search = !MapInterCtrl.search;
        }
        MapInterCtrl.isSearch = function () {
            return !MapInterCtrl.search;
        }
        
        $rootScope.$watch('menuIsHidden', function () {
            $timeout(function () {
                Map.map.updateSize();
            }, 50);
        });

        $scope.$watch(function () {
            return MapInteractionsService.getMapInteraction();
        }, function (active) {
            $scope.itCtrl.active = active;
            $scope.itCtrl.currentInteraction = MapInteractionsService.getText();
        });
    }
})();