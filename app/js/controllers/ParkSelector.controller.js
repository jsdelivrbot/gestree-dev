angular
  .module('unicerApp')
  .controller('ParkSelectorController', ParkSelectorController);

ParkSelectorController.$inject = ['ParksHttp', 'Map'];

function ParkSelectorController(ParksHttp, Map) {
  var locCtrl = this;
  activate();

  function activate() {
    ParksHttp.getParks().then(function (loc) {
      locCtrl.locations = loc.features;
    });
    locCtrl.location = {};
  }
  locCtrl.onSelectCallback = function (model) {
    Map.zoomToCoordinate(model.geometry.coordinates, 'EPSG:3857');
  }
}