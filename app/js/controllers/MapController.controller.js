angular
  .module('unicerApp')
  .controller('MapController', MapController);

MapController.$inject = ['MapService', 'DirtyDataManager'];

function MapController(MapService, DirtyDataManager) {
  MapService.init();
  MapService.drawMap();
  if (DirtyDataManager.isLayerDirty()) {
    MapService.reloadLayers();
    DirtyDataManager.cleanLayer();
  };
}  