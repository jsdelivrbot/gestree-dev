angular
  .module('unicerApp')
  .service('Layers', Layers);

Layers.$inject = ['MapService', 'LayersHttp', 'WFSStyles', 'DirtyDataManager'];

function Layers(MapService, LayersHttp, WFSStyles, DirtyDataManager) {

  var layers = {};

  return {
    addLayer: addLayer,
    removeLayer: removeLayer,
    setBaseLayer: setBaseLayer
  }

  function addLayer(layerData, style) {
    if (layerData.type === 'WMS') {
      _addWMSLayer(layerData);
    } else if (layerData.type === 'TileWMS') {
      _addTiledWMSLayer(layerData);
    } else {
      _addWFSLayer(layerData, style);
    }
  }
  function removeLayer(layerData) {
    if (layers[layerData.key]) {
      MapService.getMap().removeLayer(layers[layerData.key]);
      layers[layerData.key].isVisible = false;
    }
  }
  function setBaseLayer(layer) {
    MapService.getMap().getLayers().setAt(0, layer);
  }

  function _addWFSLayer(layerData) {
    if (_checkLayer(layerData.key)) {
      var wfsLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          loader: function (extent) {
            var dataOptions = {
              service: 'WFS',
              version: '1.1.1',
              request: 'GetFeature',
              typename: layerData.workspace + ":" + layerData.name,
              srsname: 'EPSG:27493',
              outputFormat: 'application/json',
              format_options: 'id_policy:gid'
            }
            if(layerData.filter){
              dataOptions.CQL_FILTER = "id_zona="+layerData.filter.id_zona; 
            }else{
              dataOptions.bbox = ol.proj.transformExtent(extent, 'EPSG:3857', ol.proj.get('EPSG:27493')).join(',') + ',' + ol.proj.get('EPSG:27493').getCode()
            }
            LayersHttp
              .fetch(dataOptions)
              .then(function (response) {
                wfsLayer
                  .getSource()
                  .addFeatures(
                  new ol.format.GeoJSON().readFeatures(response, {
                    featureProjection: 'EPSG:3857',
                    dataProjection: ol.proj.get('EPSG:27493')
                  }))
              });
          },
          strategy: ol.loadingstrategy.bbox,
          updateWhileAnimating: true
        })
      });
      wfsLayer.isVisible = true;
      if (layerData.style) {
        wfsLayer.setStyle(WFSStyles[layerData.style]);
      }
      if (layerData.opacity) {
        wfsLayer.setOpacity(layerData.opacity);
      }
      MapService.getMap().addLayer(wfsLayer);
      layers[layerData.key] = wfsLayer;
    } else {
      if (layerData.style) {
        layers[layerData.key].setStyle(WFSStyles[layerData.style]);
      }
      if (!layers[layerData.key].isVisible) {
        MapService.getMap().addLayer(layers[layerData.key]);
        layers[layerData.key].isVisible = true;
      }
    }
  }
  function _addWMSLayer(layerData) {
    if (_checkLayer(layerData.key)) {
      var wmsLayer = new ol.layer.Image({
        opacity: layerData.opacity,
        source: new ol.source.ImageWMS({
          url: 'http://gistree.espigueiro.pt/geoserver/wms',
          params: {
            'LAYERS': layerData.workspace + ":" + layerData.name
          },
          extent: layerData.extent,
        }),
        minResolution: _calculateResolution(layerData.maxZoom),
        maxResolution: _calculateResolution(layerData.minZoom),
        group: layerData.group,
        queryable: layerData.queryable
      });
      MapService.getMap().addLayer(wmsLayer);
      wmsLayer.isVisible = true;
      layers[layerData.key] = wmsLayer;
    } else {
      if (!layers[layerData.key].isVisible) {
        MapService.getMap().addLayer(layers[layerData.key]);
        layers[layerData.key].isVisible = true;
      }
    }
  }
  function _addTiledWMSLayer(layerData) {
    if (_checkLayer(layerData.key)) {
      var wmsLayer = new ol.layer.Tile({
        opacity: layerData.opacity,
        source: new ol.source.TileWMS({
          url: 'http://gistree.espigueiro.pt/geoserver/wms',
          params: {
            'LAYERS': layerData.workspace + ":" + layerData.name
          },
          extent: layerData.extent,
        }),
        minResolution: _calculateResolution(layerData.maxZoom),
        maxResolution: _calculateResolution(layerData.minZoom),
        group: layerData.group,
        queryable: layerData.queryable
      });
      MapService.getMap().addLayer(wmsLayer);
      wmsLayer.isVisible = true;
      layers[layerData.key] = wmsLayer;
    } else {
      if (!layers[layerData.key].isVisible) {
        MapService.getMap().addLayer(layers[layerData.key]);
        layers[layerData.key].isVisible = true;
      }
    }

  }

  function _checkLayer(layer_key) {
    return !layers.hasOwnProperty(layer_key);
  }
  function _calculateResolution(zoomLevel) {
    if (typeof zoomLevel == 'undefined') {
      return zoomLevel;
    } else {
      return Math.floor(156543.04 / (Math.pow(2, zoomLevel)));
    }
  };

}