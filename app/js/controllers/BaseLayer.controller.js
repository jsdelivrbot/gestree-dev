angular
  .module('unicerApp')
  .controller('BaseLayerController', BaseLayerController);

BaseLayerController.$inject = ['$scope'];

function BaseLayerController($scope) {

  $scope.baseLayers = [
    {
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
  $scope.baseLayer = "Mapa de Base";

  $scope.setBaseLayer = function (layer) {
    $scope.baseLayer = layer.name;
    Map.setBaseLayer(layer.layerDef);
  };
  
}