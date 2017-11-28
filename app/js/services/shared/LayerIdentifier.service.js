angular
  .module('unicerApp')
  .service('LayerIdentifier', LayerIdentifierService);

LayerIdentifierService.$inject = ['LayersHttp'];

function LayerIdentifierService(LayersHttp) {
  var promises = [];

  return {
    setLayers: setLayers,
    getLayers: getLayers
  };

  function setLayers(evt, view, layers) {
    promises.length = 0;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].isQueryable()) {
        promises.push(LayersHttp.fetchInfo(layers[i], evt.coordinate, view));
      }
    }
  }
  
  function getLayers(){
    return promises;
  }
}