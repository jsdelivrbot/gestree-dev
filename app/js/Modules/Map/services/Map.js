(function () {
    'use strict';
    angular
        .module('MapModule')
        .provider('Map', Map)

    function Map() {

        var _layers, _userFeatures;
        var _mapConfig = {};
        var _interactions, _controls = [];

        this.setMapTarget = function (t) {
            _mapConfig._mapTarget = t;
        };

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
            return new MapInstance(_mapConfig);
        }
    }

    function MapInstance(_mapConfig, CONFIG) {
        this.map = new ol.Map({
            target: _mapConfig._mapTarget,
            layers: _mapConfig._defaultLayers,
            interactions: _mapConfig._interactions,
            controls: _mapConfig._controls,
            view: _mapConfig._defaultView
        });
        this._layers = {};
        this._userFeatures = {};
        this.config = CONFIG;
    }

    MapInstance.prototype.setCurrentTarget = function (target) {
        this.map.setTarget(document.getElementById(target));
    };

    MapInstance.prototype.setCenter = function (c, projection) {
        var proj = projection || 'EPSG:4326';
        this.map.getView().setCenter(ol.proj.transform(c, ol.proj.get(proj), 'EPSG:3857'));
    }
    MapInstance.prototype.setZoom = function (z) {
        this.map.getView().setZoom(z);
    }

    MapInstance.prototype.setCenterAndZoom = function (c, z, projection) {
        this.setCenter(c, projection);
        this.setZoom(z);
    }

    MapInstance.prototype.zoomToCoordinate = function (coord, projection) {
        var proj = projection || 'EPSG:4326';
        this.map.getView().animate({
            center: ol.proj.transform(coord, ol.proj.get(proj), 'EPSG:3857'),
            duration: 1000,
            zoom: 16
        });
    };

    MapInstance.prototype.setBaseLayer = function (layer) {
        this.map.getLayers().setAt(0, layer);
    };

    MapInstance.prototype.addLayer = function (layerData, style) {
        if (layerData.type === 'WMS') {
            _addWMSLayer(layerData);
        } else if (layerData.type === 'TileWMS') {
            _addTiledWMSLayer(layerData);
        } else {
            return this._addWFSLayer(layerData, style);
        }
    };

    MapInstance.prototype._addWFSLayer = function (layerData, style) {
        console.log("Style");
        console.log(style);
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

    MapInstance.prototype.addWMSLayer = function (layerData) {
        if (this._checkLayer(layerData.key)) {
            var wmsLayer = new ol.layer.Image({
                opacity: layerData.opacity,
                source: new ol.source.ImageWMS({
                    url: this.CONFIG.URL_WMS[this.CONFIG.ENVIRONMENT],
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
    }

    MapInstance.prototype._calculateResolution = function () {
        if (typeof zoomLevel == 'undefined') {
            return zoomLevel;
        } else {
            return Math.floor(156543.04 / (Math.pow(2, zoomLevel)));
        }
    }

    MapInstance.prototype._checkLayer = function (layer_key) {
        return !this._layers.hasOwnProperty(layer_key);
    }

    MapInstance.prototype.setStyleFunction = function (stFun) {
        window.mapinha = this.map;
    }

    ol.Collection.prototype.insertLayer = function (layer) {
        var index = this.getArray().findIndex(function (mapLayer) {
            return mapLayer.get('group') < layer.get('group');
        });
        if (index !== -1) {
            this.insertAt(index, layer);
        } else {
            this.push(layer);
        }
    };

    ol.layer.Base.prototype.isQueryable = function () {
        return this.get('queryable');
    };

})();
/* 
    var ms = {
        map: map, // ol.Map
        addLayer: addLayer,
        removeLayer: removeLayer,
        setDefaultView: setDefaultView,
        userFeatures: _userFeatures,
        setBaseLayer: setBaseLayer,
        zoomToCoordinate: zoomToCoordinate
    };
    return ms;

    function init(config) {
        proj4.defs("EPSG:27493", "+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +towgs84=-223.237,110.193,36.649,0,0,0,0 +units=m +no_defs");
        var extent = [-127101.82, -300782.39, 160592.41, 278542.12];
        var projection = ol.proj.get('EPSG:27493');
        projection.setExtent(extent);
        mapConfig = angular.extend(defaultMapConfig, config);
        map = new ol.Map({
            target: mapConfig.target,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM({}),
                    queryable: false
                })
            ],
            interactions: mapConfig.interactions,
            controls: mapConfig.controls,
            view: new ol.View({
                center: ol.proj.transform(mapConfig.center, 'EPSG:4326', 'EPSG:3857'),
                zoom: mapConfig.zoom,
                minZoom: 11
            })
        });
        map.getView().on('change:resolution', function (evt) {
            var zoomLevel = evt.target.getZoom();
            if (zoomLevel === parseInt(zoomLevel, 10)) {
                $("#tree").fancytree("getTree").visit(function (node) {
                    if (!node.isFolder()) {
                        if (node.data.minZoom != undefined) {
                            if (node.data.minZoom < zoomLevel) {
                                node.removeClass("layer-hidden");
                            } else {
                                node.addClass("layer-hidden");
                            }
                        }
                    }
                });
            }
        });
    };

    function setBaseLayer(layer) {
        map.getLayers().setAt(0, layer);
    }

    function addLayer(layerData) {
        if (layerData.type === 'WMS') {
            addWMSLayer(layerData);
        } else if (layerData.type === 'TileWMS') {
            addTiledWMSLayer(layerData);
        } else {
            addWFSLayer(layerData);
        }
    }

    function addTiledWMSLayer(layerData) {
        if (_checkLayer(layerData.key)) {
            var wmsLayer = new ol.layer.Tile({
                opacity: layerData.opacity,
                source: new ol.source.TileWMS({
                    url: CONFIG.URL_WMS[CONFIG.ENVIRONMENT],
                    params: {
                        'LAYERS': layerData.workspace + ":" + layerData.name
                    },
                    extent: layerData.extent,
                }),
                minResolution: calculateResolution(layerData.maxZoom),
                maxResolution: calculateResolution(layerData.minZoom),
                group: layerData.group,
                queryable: layerData.queryable
            });
            _layers[layerData.key] = wmsLayer;
            map.getLayers().insertLayer(wmsLayer);
            _layers[layerData.key].visible = true;
        } else {
            if (!_layers[layerData.key].visible) {
                map.getLayers().insertLayer(_layers[layerData.key]);
                _layers[layerData.key].visible = true;
            }
        }
    }

    function addWMSLayer(layerData) {
        if (_checkLayer(layerData.key)) {
            var wmsLayer = new ol.layer.Image({
                opacity: layerData.opacity,
                source: new ol.source.ImageWMS({
                    url: CONFIG.URL_WMS[CONFIG.ENVIRONMENT],
                    params: {
                        'LAYERS': layerData.workspace + ":" + layerData.name
                    },
                    extent: layerData.extent,
                }),
                minResolution: calculateResolution(layerData.maxZoom),
                maxResolution: calculateResolution(layerData.minZoom),
                group: layerData.group,
                queryable: layerData.queryable
            });
            _layers[layerData.key] = wmsLayer;
            map.getLayers().insertLayer(wmsLayer);
            _layers[layerData.key].visible = true;
        } else {
            if (!_layers[layerData.key].visible) {
                map.getLayers().insertLayer(_layers[layerData.key]);
                _layers[layerData.key].visible = true;
            }
        }
    }

    function removeLayer(layerData) {
        if (_layers[layerData.key]) {
            map.removeLayer(_layers[layerData.key]);
            _layers[layerData.key].visible = false;
        }
    }

    function setDefaultView() {
        map.setView(new ol.View({
            center: ol.proj.transform(mapConfig.center, 'EPSG:4326', 'EPSG:3857'),
            zoom: mapConfig.zoom,
            extent: [-928405.1144335504, 5033494.2861691285, -777977.0427683234, 5078592.132857382],
            minZoom: 11
        }));
    }

    function zoomToCoordinate(coordinate, proj) {
        var view = map.getView();
        window.view = view;
        map.getView().animate({
            center: ol.proj.transform(coordinate, ol.proj.get(proj), 'EPSG:3857'),
            duration: 1000,
            zoom: 16
        });
    }

    function addWFSLayer(layerData) {
        if (_checkLayer(layerData.key)) {
            var wfsLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    loader: function (extent) {
                        $.ajax(CONFIG.URL_WFS[CONFIG.ENVIRONMENT], {
                            type: 'GET',
                            data: {
                                service: 'WFS',
                                version: '1.1.1',
                                request: 'GetFeature',
                                typename: layerData.workspace + ":" + layerData.name,
                                srsname: 'EPSG:27493',
                                outputFormat: 'application/json',
                                bbox: ol.proj.transformExtent(extent, 'EPSG:3857', ol.proj.get('EPSG:27493')).join(',') + ',' + ol.proj.get('EPSG:27493').getCode()
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
                style: FeaturesStyle.style
            });
            _layers[layerData.key] = wfsLayer;
            if (layerData.style) {
                wfsLayer.setStyle(new ol.style.Style(layerData.style));
                wfsLayer.setOpacity(layerData.opacity);
            }
            map.addLayer(wfsLayer);
            _layers[layerData.key].visible = true;
        } else {
            if (!_layers[layerData.key].visible) {
                map.addLayer(_layers[layerData.key]);
                _layers[layerData.key].visible = true;
            }
        }
    }
};

*/