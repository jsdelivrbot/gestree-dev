(function () {
    'use strict';
    angular
        .module('MapModule')
        .factory('MapService', MapService)

    MapService.$inject = ['CONFIG', '$http', 'FeaturesStyle'];

    function MapService(CONFIG, $http, FeaturesStyle) {
        var _layers = {};
        var _userFeatures = {};
        if (!ol) return {};
        var map = {},    
            defaultMapConfig = {
                zoom: 12,
                target: 'map',
                center: [-7.593569, 41.595564],
                interactions: [new ol.interaction.MouseWheelZoom(), new ol.interaction.DragPan()],
                controls: [new ol.control.ScaleLine(), new ol.control.OverviewMap({
                    // see in overviewmap-custom.html to see the custom CSS used
                    className: 'ol-overviewmap ol-custom-overviewmap',
                    layers: [
                        new ol.layer.Image({
                            source: new ol.source.ImageWMS({
                                url: CONFIG.URL_WMS[CONFIG.ENVIRONMENT],
                                params: {
                                    'LAYERS': 'unicer:limite'
                                },
                                extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                            }),
                        }),
                        new ol.layer.Image({
                            source: new ol.source.ImageWMS({
                                url: CONFIG.URL_WMS[CONFIG.ENVIRONMENT],
                                params: {
                                    'LAYERS': 'unicer:base'
                                },
                                extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                            }),
                        }),
                        new ol.layer.Image({
                            source: new ol.source.ImageWMS({
                                url: CONFIG.URL_WMS[CONFIG.ENVIRONMENT],
                                params: {
                                    'LAYERS': 'unicer:edificios'
                                },
                                extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                            }),
                        })
                    ],
                    collapseLabel: '\u002D',
                    label: '\u002B',
                    collapsed: true,
                    tipLabel: ''
                })]
            },
            mapConfig = {};
        if (angular.equals(map, {})) {
            init();
        }
        var ms = {
            map: map, // ol.Map
            init: init,
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

        function _checkLayer(layer_key) {
            return !_layers.hasOwnProperty(layer_key);
        }

        function calculateResolution(zoomLevel) {
            if (typeof zoomLevel == 'undefined') {
                return zoomLevel;
            } else {
                return Math.floor(156543.04 / (Math.pow(2, zoomLevel)));
            }
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