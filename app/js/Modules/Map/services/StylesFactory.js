(function () {
    'use strict';

    angular
        .module('MapModule')
        .factory('StylesFactory', StylesFactory);

    function StylesFactory() {
        return new Styles();

        function Styles() {
            this.treeDefault = function () {
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
            this.treeHighlight = function () {
                return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({
                            color: [72,24,70, 1]
                        }),
                        stroke: new ol.style.Stroke({
                            color: [0, 0, 0, 1],
                            width: 2
                        }),
                    })
                });
            }
        }
    }
})();