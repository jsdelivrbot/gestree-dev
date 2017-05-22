(function () {
    'use strict';
    angular
        .module('MapModule')
        .controller('BaseLayerController', BaseLayerController);

    BaseLayerController.$inject = ['$scope', 'MapService'];

    function BaseLayerController($scope, MapService) {
        var blCtrl = this;
        activate();

        blCtrl.setBaseLayer = function (layer) {
            blCtrl.baseLayer = layer.name;
            MapService.setBaseLayer(layer.layerDef);
        }

        function activate() {
            blCtrl.baseLayers = [{
                    name: "Open Street Map",
                    layerDef: new ol.layer.Tile({
                        source: new ol.source.OSM({})
                    })
                },
                {
                    name: "Camada em Branco",
                    layerDef: new ol.layer.Tile({})
                }
            ];
            blCtrl.baseLayer = "Mapa de Base";
        }
    }
})();