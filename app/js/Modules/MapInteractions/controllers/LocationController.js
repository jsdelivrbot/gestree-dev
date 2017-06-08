(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['LocationsService', 'Map'];

    function LocationController(LocationsService, Map) {
        var locCtrl = this;
        activate();

        function activate() {
            LocationsService.get().then(function (loc) {
                locCtrl.locations = loc.features;
            });
            locCtrl.location = {};
        }
        locCtrl.onSelectCallback = function (model) {
            Map.zoomToCoordinate(model.geometry.coordinates, 'EPSG:3857');
        }
    }
})();