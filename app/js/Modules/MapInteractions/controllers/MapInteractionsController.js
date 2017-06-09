(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .controller('MapInteractionsController', MapInteractionsController);

    MapInteractionsController.$inject = ['$scope', 'MapInteractionsService', 'Map'];

    function MapInteractionsController($scope, MapInteractionsService, Map) {
        var MapInterCtrl = this;
        
        MapInterCtrl.isActive = function (active) {
            return MapInterCtrl.active == active;
        }
        MapInterCtrl.setDefaultView = function (a) {
            Map.setDefaultView();
        };
        MapInterCtrl.setInteraction = function (interaction) {
            MapInteractionsService.setMapInteraction(interaction);
        };
        MapInterCtrl.showControlPanel = function () {
            $scope.$emit("controlPanel:panelVisibility", true);
        };
        MapInterCtrl.showSearchBar = function () {
            MapInterCtrl.search = !MapInterCtrl.search;
        }
        MapInterCtrl.isSearch = function () {
            return !MapInterCtrl.search;
        }

        $scope.$watch(function () {
            return MapInteractionsService.getMapInteraction();
        }, function (active) {
            MapInterCtrl.active = active;
            MapInterCtrl.currentInteraction = MapInteractionsService.getText();
        });

        init();

        function init() {
            MapInteractionsService.setMapInteraction('DragPan');
            MapInterCtrl.search = false;
        }
    }
})();