(function () {
    'use strict';

    angular
        .module('MapModule')
        .provider('Map', Map)
        .provider('Minimap', Map);

    function Map() {
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

        this.$get = ['MapFactory', function (_Map_) {
            return new _Map_(_mapConfig);
        }];
    }
})();