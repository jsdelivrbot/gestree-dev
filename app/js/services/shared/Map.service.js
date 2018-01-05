angular
  .module('unicerApp')
  .service('MapService', MapService);

MapService.$inject = ['$timeout'];

function MapService($timeout) {

  var map;
  var defaultInteractions = [
    new ol.interaction.MouseWheelZoom()];
  var defaultControls = [
    new ol.control.ScaleLine(),
    new ol.control.OverviewMap({
      className: 'ol-overviewmap ol-custom-overviewmap',
      layers: [
        new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://gistree.espigueiro.pt/geoserver/wms',
            params: {
              'LAYERS': 'unicer:limite'
            },
            extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
          }),
        }),
        new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://gistree.espigueiro.pt/geoserver/wms',
            params: {
              'LAYERS': 'unicer:base'
            },
            extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
          }),
        }),
        new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://gistree.espigueiro.pt/geoserver/wms',
            params: {
              'LAYERS': 'unicer:edificios'
            },
            extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
          }),
        }),
        new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://gistree.espigueiro.pt/geoserver/wms',
            params: {
              'LAYERS': 'unicer:limite_vidago'
            },
            extent: [46283.1896687427, 217450.585892474, 46645.3069363016, 218536.060508136],
          }),
        }),
        new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://gistree.espigueiro.pt/geoserver/wms',
            params: {
              'LAYERS': 'unicer:base_vidago'
            },
            extent: [46283.1896687427, 217450.585892474, 46645.3069363016, 218536.060508136],
          }),
        }),
        new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://gistree.espigueiro.pt/geoserver/wms',
            params: {
              'LAYERS': 'unicer:edificios_vidago'
            },
            extent: [46283.1896687427, 217450.585892474, 46645.3069363016, 218536.060508136],
          }),
        })
      ],
      collapseLabel: '\u002D',
      label: '\u002B',
      collapsed: false,
      tipLabel: ''
    }),
    new ol.control.MousePosition({
      coordinateFormat: function (coord) {
        return ol.coordinate.format(coord, " {x} , {y} ", 4);
      },
      projection: 'EPSG:4326',
      className: '',
      undefinedHTML: '&nbsp;'
    }),
    new ol.control.MousePosition({
      coordinateFormat: function (coord) {
        return ol.coordinate.format(coord, " {x} , {y} ", 4);
      },
      projection: ol.proj.get('EPSG:27493'),
      className: '',
      undefinedHTML: '&nbsp;'
    })];
  var defaultOptions = {
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({}),
        queryable: false
      })
    ],
    interactions: [],
    controls: [],
    view: new ol.View({
      center: ol.proj.transform([-7.593569, 41.595564], 'EPSG:4326', 'EPSG:3857'),
      zoom: 11,
      minZoom: 11
    })
  };

  return {
    init: mapInitialization,
    getMap: getMap,
    getView: getView,
    getControls: getControls,
    getInteractions: getInteractions,
    resetView: resetView,
    zoomToCoordinate: zoomToCoordinate,
    drawMap: drawMap,
    reloadLayers: reloadLayers
  };

  function mapInitialization(options) {
    var mapOptions = angular.extend(defaultOptions, options);
    if (!map) {
      map = new ol.Map(mapOptions);
      for (var i = 0; i < defaultInteractions.length; i++) {
        map.addInteraction(defaultInteractions[i]);
      }
      $timeout(function () {
        for (var i = 0; i < defaultControls.length; i++) {
          map.addControl(defaultControls[i]);
        }
      })
    }
  }
  function getMap() {
    return map;
  }
  function getView() {
    return map.getView();
  }
  function getControls() {
    return map.getControls();
  }
  function getInteractions() {
    return map.getInteractions();
  }
  function resetView() {
    var newView = new ol.View({
      center: ol.proj.transform([-7.593569, 41.595564], 'EPSG:4326', 'EPSG:3857'),
      zoom: 11,
      minZoom: 11
    });
    map.setView(newView);
  }
  function zoomToCoordinate(coordinate, projection) {
    var proj = projection || 'EPSG:4326';
    map.getView().animate({
      center: ol.proj.transform(coordinate, ol.proj.get(proj), 'EPSG:3857'),
      duration: 1000,
      zoom: 16
    });
  }
  function drawMap() {
    $timeout(function () {
      map.setTarget(document.getElementById('map'));
      map.updateSize();
    }, 200);
  }
  function reloadLayers() {
    map.getLayers().forEach(function (layer) {
      if (layer instanceof ol.layer.Vector) {
        layer.getSource().clear();
      }
    });
  }

}