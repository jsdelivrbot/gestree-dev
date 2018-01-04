angular
  .module('unicerApp')
  .service('MapInteractionsService', MapInteractionsService);

MapInteractionsService.$inject = ['MapService', 'LayerIdentifier', 'WFSStyles', '$timeout'];

function MapInteractionsService(MapService, LayerIdentifier, WFSStyles, $timeout) {
  var mapInteractions = MapService.getInteractions();
  var activeInteraction = {};
  var selectInteraction = new ol.interaction.Select({
    style: WFSStyles.treeSelected
  });
  setActiveInteraction('DragPan');

  $timeout(function () {
    MapService.getMap().addInteraction(selectInteraction);
  }, 250)
  return {
    setActiveInteraction: setActiveInteraction,
    getActiveInteraction: getActiveInteraction,
    isActive: isActive,
    setDefaultView: setDefaultView,
    zoomTo: zoomTo,
    getSelectInteraction: getSelectInteraction
  }

  function setActiveInteraction(interaction) {
    switch (interaction) {
      case 'DragPan':
        activeInteraction = new ol.interaction.DragPan({});
        activeInteraction.text = 'Mover Mapa';
        break;
      case 'ZoomIn':
        activeInteraction = new ol.interaction.Pointer({
          handleDownEvent: function (e) {
            var view = MapService.getView();
            view.setCenter(e.coordinate);
            view.setZoom(view.getZoom() + 1);
          }
        });
        activeInteraction.text = 'Aproximar Mapa';
        break;
      case 'ZoomOut':
        activeInteraction = new ol.interaction.Pointer({
          handleDownEvent: function (e) {
            var view = MapService.getView();
            view.setCenter(e.coordinate);
            view.setZoom(view.getZoom() - 1);
          }
        })
        activeInteraction.text = 'Afastar Mapa';
        break;
      case 'ZoomBox':
        activeInteraction = new ol.interaction.DragZoom({
          condition: ol.events.condition.always,
          className: 'drag_zoom_box'
        })
        activeInteraction.text = 'Fazer Zoom de Caixa';
        break;
      case 'Identify':
        activeInteraction = new ol.interaction.Pointer({
          handleDownEvent: function (evt) {
            LayerIdentifier.setLayers(evt, evt.map.getView(), evt.map.getLayers().getArray());
          }
        });
        activeInteraction.text = 'Identificar Camadas';
        break;
    }
    activeInteraction.type = interaction;
    mapInteractions.setAt(1, activeInteraction);
  }
  function getActiveInteraction() {
    return activeInteraction.text;
  }
  function isActive(type) {
    return activeInteraction.type === type;
  }
  function setDefaultView() {
    MapService.resetView();
  }
  function zoomTo(coordinate, proj) {
    MapService.zoomToCoordinate(coordinate, proj);
  }
  function getSelectInteraction() {
    return selectInteraction;
  }



}