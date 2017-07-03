(function () {
    'use strict';

    angular
        .module('MapModule', ['unicerApp.configs', 'MapInteractionsModule'])
        .config(['MapProvider', 'Globals', function (MapProvider, Globals) {
            MapProvider.setDefaultLayers([
                new ol.layer.Tile({
                    source: new ol.source.OSM({}),
                    queryable: false
                }),
                new ol.layer.Image({
                    opacity: 1,
                    source: new ol.source.ImageWMS({
                        url: 'http://localhost:3002/geoserver/wms',
                        params: {
                            'LAYERS': "unicer:limite"
                        },
                        extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                    })
                }),
                new ol.layer.Tile({
                    opacity: 1,
                    source: new ol.source.TileWMS({
                        url: 'http://localhost:3002/geoserver/wms',
                        params: {
                            'LAYERS': "unicer:base"
                        },
                        extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                    })
                }),
                new ol.layer.Tile({
                    opacity: 1,
                    source: new ol.source.TileWMS({
                        url: 'http://localhost:3002/geoserver/wms',
                        params: {
                            'LAYERS': "unicer:edificios"
                        },
                        extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                    })
                })
            ]);
            MapProvider.setInteractions([new ol.interaction.MouseWheelZoom(), new ol.interaction.DragPan()]);
            MapProvider.setControls([new ol.control.ScaleLine(), new ol.control.OverviewMap({
                // see in overviewmap-custom.html to see the custom CSS used
                className: 'ol-overviewmap ol-custom-overviewmap',
                layers: [
                    new ol.layer.Image({
                        source: new ol.source.ImageWMS({
                            url: Globals.URL_WMS[Globals.ENVIRONMENT],
                            params: {
                                'LAYERS': 'unicer:limite'
                            },
                            extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                        }),
                    }),
                    new ol.layer.Image({
                        source: new ol.source.ImageWMS({
                            url: Globals.URL_WMS[Globals.ENVIRONMENT],
                            params: {
                                'LAYERS': 'unicer:base'
                            },
                            extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                        }),
                    }),
                    new ol.layer.Image({
                        source: new ol.source.ImageWMS({
                            url: Globals.URL_WMS[Globals.ENVIRONMENT],
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
            })]);
            MapProvider.setCenterAndZoom([-7.593569, 41.595564], 11);
        }]).config(['MinimapProvider', 'Globals', function (MinimapProvider, Globals) {
            MinimapProvider.setDefaultLayers([
                new ol.layer.Tile({
                    source: new ol.source.OSM({}),
                    queryable: false
                }),
                new ol.layer.Image({
                    opacity: 1,
                    source: new ol.source.ImageWMS({
                        url: Globals.URL_WMS[Globals.ENVIRONMENT],
                        params: {
                            'LAYERS': "unicer:limite"
                        },
                        extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                    })
                }),
                new ol.layer.Tile({
                    opacity: 1,
                    source: new ol.source.TileWMS({
                        url: Globals.URL_WMS[Globals.ENVIRONMENT],
                        params: {
                            'LAYERS': "unicer:base"
                        },
                        extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                    })
                }),
                new ol.layer.Tile({
                    opacity: 1,
                    source: new ol.source.TileWMS({
                        url: Globals.URL_WMS[Globals.ENVIRONMENT],
                        params: {
                            'LAYERS': "unicer:edificios"
                        },
                        extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                    })
                })
            ]);
            MinimapProvider.setInteractions([]);
            MinimapProvider.setControls([]);
            MinimapProvider.setCenterAndZoom([-7.593569, 41.595564], 11);
        }]).run(function () {
            
            proj4.defs("EPSG:27493", "+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +towgs84=-223.237,110.193,36.649,0,0,0,0 +units=m +no_defs");
            var extent = [-127101.82, -300782.39, 160592.41, 278542.12];
            var projection = ol.proj.get('EPSG:27493');
            projection.setExtent(extent);

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
        });
})();