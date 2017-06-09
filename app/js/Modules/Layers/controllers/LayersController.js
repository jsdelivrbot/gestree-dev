(function () {
    'use strict';

    angular
        .module('LayersModule')
        .controller('LayersController', LayersController);

    LayersController.$inject = ['Map', '$scope', '$rootScope'];

    function LayersController(Map, $scope, $rootScope) {
        var layersCtrl = this;

        layersCtrl.setBaseLayer = function (layer) {
            layersCtrl.baseLayer = layer.name;
            Map.setBaseLayer(layer.layerDef);
        };    

        layersCtrl.setTab = function (tab) {
            tc.selectedTab = tab;
        };

        layersCtrl.expandTree = function () {
            $scope.tree.visit(function (node) {
                node.setExpanded(true);
            });
        };

        layersCtrl.collapseTree = function () {
            $scope.tree.visit(function (node) {
                node.setExpanded(false);
            });
        };

        layersCtrl.deselectAll = function () {
            $scope.tree.visit(function (node) {
                node.setSelected(false);
            });
        };      

        layersCtrl.help = function () {
            alert(" Em Desenvolvimento... ");
        };

        init();

        function init() {
            layersCtrl.baseLayers = [{
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
            layersCtrl.baseLayer = "Mapa de Base";
        }
    }
})();