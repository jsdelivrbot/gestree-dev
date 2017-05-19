(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .controller('MapInteractionsController', MapInteractionsController);

    MapInteractionsController.$inject = ['$scope', '$timeout', 'MapService', 'MapInteractionsService'];

    function MapInteractionsController($scope, $timeout, MapService, MapInteractionsService) {
        MapInteractionsService.setMapInteraction('DragPan');
        this.search = false;
        this.isActive = function (active) {
            return this.active == active;
        }
        this.setDefaultView = function (a) {
            MapService.setDefaultView();
        };
        this.setInteraction = function (interaction) {
            MapInteractionsService.setMapInteraction(interaction);
        };
        this.showMenu = function () {
            this.menuIsHidden = false;
        };
        this.showSearchBar = function(){
            this.search = !this.search;
        }
        this.isSearch = function(){
            return !this.search;
        }
        $scope.$watch(function () {
            return MapInteractionsService.getMapInteraction();
        }, function (active) {
            $scope.itCtrl.active = active;
        });
        $scope.$watch('itCtrl.active', function () {
            $scope.itCtrl.currentInteraction = MapInteractionsService.getText();
        });
        $scope.$watch('itCtrl.menuIsHidden', function () {
            $timeout(function () {
                MapService.map.updateSize();
            }, 10);
        });
    }
})();