(function () {
    'use strict';

    angular
        .module('MapModule')
        .service('FeaturesStyle', FeaturesStyle);

    function FeaturesStyle() {

        this.style = _style;

        function _style(feature, number) {
            return _arvoresDefault();
        }

        function _arvoresDefault() {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({
                        color: [24, 72, 26, 0.8]
                    }),
                    stroke: new ol.style.Stroke({
                        color: [0, 0, 0, 1]
                    }),
                })
            });
        }
    }
})();