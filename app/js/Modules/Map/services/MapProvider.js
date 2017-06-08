(function () {
    'use strict';
    angular
        .module('MapModule')
        .provider('Map', Map)
        .provider('Minimap', Map);

    Map.$inject = ['Globals']

    function Map(Globals) {

        var _layers, _userFeatures;
        var _mapConfig = {};
        var _interactions, _controls = [];

        this.setInteractions = function (i) {
            _mapConfig._interactions = i;
        };

        this.setControls = function (c) {
            _mapConfig._controls = c;
        };

        this.setDefaultView = function (dv) {
            _mapConfig._defaultView = dv;
        };

        this.setCenterAndZoom = function (c, z) {
            _mapConfig._center = c;
            _mapConfig._zoom = z;
            _mapConfig._defaultView = new ol.View({
                center: ol.proj.transform(_mapConfig._center, 'EPSG:4326', 'EPSG:3857'),
                zoom: _mapConfig._zoom,
                minZoom: 11
            });
        };

        this.setDefaultLayers = function (layers) {
            _mapConfig._defaultLayers = layers;
        }

        this.$get = function () {
            return new _Map_(_mapConfig);
        };

        function _Map_(config) {
            this.map = new ol.Map({
                target: config._mapTarget,
                layers: config._defaultLayers,
                interactions: config._interactions,
                controls: config._controls,
                view: config._defaultView
            });
            this._defaultConfig = {};
            this._layers = {};
            this._userFeatures = {};
            angular.copy(config, this._defaultConfig);
        };

        _Map_.prototype.getMapObject = function () {
            return this.map;
        };

        _Map_.prototype.setTarget = function (target) {
            this.map.setTarget(document.getElementById(target));
        };

        _Map_.prototype.setDefaultView = function (dv) {
            this.map.setView(this._defaultConfig._defaultView);
        };

        _Map_.prototype.setCenter = function (c, projection) {
            var proj = projection || 'EPSG:4326';
            this.map.getView().setCenter(ol.proj.transform(c, ol.proj.get(proj), 'EPSG:3857'));
        };

        _Map_.prototype.setZoom = function (z) {
            this.map.getView().setZoom(z);
        };

        _Map_.prototype.setCenterAndZoom = function (c, z, projection) {
            this.setCenter(c, projection);
            this.setZoom(z);
        };

        _Map_.prototype.zoomToCoordinate = function (coord, projection) {
            var proj = projection || 'EPSG:4326';
            this.map.getView().animate({
                center: ol.proj.transform(coord, ol.proj.get(proj), 'EPSG:3857'),
                duration: 1000,
                zoom: 16
            });
        };

        _Map_.prototype.setBaseLayer = function (layer) {
            this.map.getLayers().setAt(0, layer);
        };

        _Map_.prototype.addLayer = function (layerData, style) {
            if (layerData.type === 'WMS') {
                return this._addWMSLayer(layerData);
            } else if (layerData.type === 'TileWMS') {
                return this._addTiledWMSLayer(layerData);
            } else {
                return this._addWFSLayer(layerData, style);
            }
        };

        _Map_.prototype._addWFSLayer = function (layerData, style) {
            if (this._checkLayer(layerData.key)) {
                var wfsLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        loader: function (extent) {
                            // ADD CONFIG
                            //$.ajax(CONFIG.URL_WFS[CONFIG.ENVIRONMENT], {
                            $.ajax('http://localhost:3000/geoserver/wfs', {
                                type: 'GET',
                                data: {
                                    service: 'WFS',
                                    version: '1.1.1',
                                    request: 'GetFeature',
                                    typename: layerData.workspace + ":" + layerData.name,
                                    srsname: 'EPSG:27493',
                                    outputFormat: 'application/json',
                                    bbox: ol.proj.transformExtent(extent, 'EPSG:3857', ol.proj.get('EPSG:27493')).join(',') + ',' + ol.proj.get('EPSG:27493').getCode(),
                                    format_options: 'id_policy:gid'
                                },
                                crossDomain: true,
                            }).done(function (response) {
                                wfsLayer
                                    .getSource()
                                    .addFeatures(
                                        new ol.format.GeoJSON().readFeatures(response, {
                                            featureProjection: 'EPSG:3857',
                                            dataProjection: ol.proj.get('EPSG:27493')
                                        }));
                            });
                        },
                        strategy: ol.loadingstrategy.bbox,
                    }),
                    style: style
                });
                this._layers[layerData.key] = wfsLayer;
                if (layerData.style) {
                    wfsLayer.setStyle(new ol.style.Style(layerData.style));
                    wfsLayer.setOpacity(layerData.opacity);
                }
                this.map.addLayer(wfsLayer);
                this._layers[layerData.key].visible = true;
            } else {
                if (!this._layers[layerData.key].visible) {
                    this.map.addLayer(_layers[layerData.key]);
                    this._layers[layerData.key].visible = true;
                }
            }
            return this._layers[layerData.key];
        };

        _Map_.prototype._addWMSLayer = function (layerData) {
            if (this._checkLayer(layerData.key)) {
                var wmsLayer = new ol.layer.Image({
                    opacity: layerData.opacity,
                    source: new ol.source.ImageWMS({
                        url: Globals.URL_WMS[Globals.ENVIRONMENT],
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
                this._layers[layerData.key] = wmsLayer;
                this.map.getLayers().insertLayer(wmsLayer);
                this._layers[layerData.key].visible = true;
            } else {
                if (!this._layers[layerData.key].visible) {
                    this.map.getLayers().insertLayer(_layers[layerData.key]);
                    this._layers[layerData.key].visible = true;
                }
            }
        };

        _Map_.prototype._addTiledWMSLayer = function (layerData) {
            if (this._checkLayer(layerData.key)) {
                var wmsLayer = new ol.layer.Tile({
                    opacity: layerData.opacity,
                    source: new ol.source.TileWMS({
                        url: Globals.URL_WMS[Globals.ENVIRONMENT],
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
                this._layers[layerData.key] = wmsLayer;
                this.map.getLayers().insertLayer(wmsLayer);
                this._layers[layerData.key].visible = true;
            } else {
                if (!this._layers[layerData.key].visible) {
                    this.map.getLayers().insertLayer(_layers[layerData.key]);
                    this._layers[layerData.key].visible = true;
                }
            }
        };

        _Map_.prototype._checkLayer = function (layer_key) {
            return !this._layers.hasOwnProperty(layer_key);
        };

        function _calculateResolution(zoomLevel) {
            if (typeof zoomLevel == 'undefined') {
                return zoomLevel;
            } else {
                return Math.floor(156543.04 / (Math.pow(2, zoomLevel)));
            }
        };

    }
})();