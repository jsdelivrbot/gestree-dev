(function () {
    'use strict';

    angular
        .module('MapModule')
        .factory('StylesFactory', StylesFactory);

    function StylesFactory() {
        return Styles;

        function Styles() {

            this.treeDefault = function () {
                return _styles.defaultStyle;
            }

            this.treeHighlight = function (featureID, treeID) {
                return featureID == treeID ? _styles.purplePoint : _styles.defaultStyle;
            }

            this.treeIntervention = function (feature) {
                return feature.getProperties().has_inter ? _styles.redPoint : _styles.defaultStyle;
            };

            var _styles = {
                purplePoint: new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 4,
                        fill: new ol.style.Fill({
                            color: [72, 24, 70, 1]
                        }),
                        stroke: new ol.style.Stroke({
                            color: [0, 0, 0, 1],
                            width: 2
                        }),
                    })
                }),
                redPoint: new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 4,
                        fill: new ol.style.Fill({
                            color: [72, 15, 15, 1]
                        }),
                        stroke: new ol.style.Stroke({
                            color: [0, 0, 0, 1],
                            width: 2
                        })
                    }),
                    zIndex: 100
                }),
                defaultStyle: new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 3,
                        fill: new ol.style.Fill({
                            color: [24, 72, 26, 0.8]
                        }),
                        stroke: new ol.style.Stroke({
                            color: [0, 0, 0, 1]
                        }),
                    })
                })
            };
        }
    }
})();