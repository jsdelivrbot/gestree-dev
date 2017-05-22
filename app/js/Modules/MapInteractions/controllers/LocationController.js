(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['LocationsService', 'MapService'];

    function LocationController(LocationsService, MapService) {
        var locCtrl = this;
        activate();

        function activate() {
            LocationsService.get().then(function (loc) {
                locCtrl.locations = loc.features;
            });
            locCtrl.location = {};
        }
        locCtrl.onSelectCallback = function (model) {
            MapService.zoomToCoordinate(model.geometry.coordinates, 'EPSG:3857');
        }
    }
})();