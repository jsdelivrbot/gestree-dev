(function () {
    'use strict';

    angular
        .module('SearchLocationModule')
        .controller('LocationController', LocationController);

    LocationController.$inject = ['LocationsFactory', 'MapService'];

    function LocationController(LocationsFactory, MapService) {
        var locCtrl = this;
        activate();

        function activate() {
            LocationsFactory.getLocalidades(function (loc) {
                locCtrl.locations = loc.features;
            });
            locCtrl.location = {};
        }
        locCtrl.onSelectCallback = function (model) {
            MapService.zoomToCoordinate(model.geometry.coordinates[0], 'EPSG:27493');
        }
    }
})();