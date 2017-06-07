(function () {
    'use strict';

    angular.module('InterventionsModule', [
            'ngRoute'
        ])
        .config(['MapProvider', function (MapProvider) {
            MapProvider.setDefaultLayers([
                new ol.layer.Tile({
                    source: new ol.source.OSM({}),
                    queryable: false
                }),
                new ol.layer.Image({
                    opacity: 1,
                    source: new ol.source.ImageWMS({
                        url: 'http://localhost:3000/geoserver/wms',
                        params: {
                            'LAYERS': "unicer:limite"
                        },
                        extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                    })
                }),
                new ol.layer.Tile({
                    opacity: 1,
                    source: new ol.source.TileWMS({
                        url: 'http://localhost:3000/geoserver/wms',
                        params: {
                            'LAYERS': "unicer:base"
                        },
                        extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                    })
                }),
                new ol.layer.Tile({
                    opacity: 1,
                    source: new ol.source.TileWMS({
                        url: 'http://localhost:3000/geoserver/wms',
                        params: {
                            'LAYERS': "unicer:edificios"
                        },
                        extent: [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                    })
                })
            ]);
            MapProvider.setInteractions([]);
            MapProvider.setControls([]);
            MapProvider.setCenterAndZoom([-7.593569, 41.595564], 11);
        }])
        .config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {
            $mdDateLocaleProvider.months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
            $mdDateLocaleProvider.shortMonths = ['jan', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
            $mdDateLocaleProvider.days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'];
            $mdDateLocaleProvider.shortDays = ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'];
            $mdDateLocaleProvider.firstDayOfWeek = 1;
            $mdDateLocaleProvider.parseDate = function (dateString) {
                var m = moment(dateString, 'DD/MM/YYYY', true);
                return m.isValid() ? m.toDate() : new Date(NaN);
            };
            $mdDateLocaleProvider.formatDate = function (date) {
                return date ? moment(date).format('DD/MM/YYYY') : '';
            };
            // In addition to date display, date components also need localized messages
            // for aria-labels for screen-reader users.
            $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
                return 'Semana ' + weekNumber;
            };
            $mdDateLocaleProvider.msgCalendar = 'Calendário';
            $mdDateLocaleProvider.msgOpenCalendar = 'Abrir o calendário';
            // You can also set when your calendar begins and ends.
            $mdDateLocaleProvider.firstRenderableDate = new Date(2000, 1, 1);
            $mdDateLocaleProvider.lastRenderableDate = new Date(2100, 12, 31);
        }]);
})();