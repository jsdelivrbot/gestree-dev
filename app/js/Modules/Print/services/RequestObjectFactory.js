(function () {
    'use strict';

    angular
        .module('PrintModule')
        .factory('RequestObjectFactory', RequestObject);

    function RequestObject() {
        const CENTER_MAPA_PEDRAS = [-7.606827, 4.546916];
        const CENTER_MAPA_VIDAGO = [-7.606827, 4.546916];

        function Request() {
            var map = {
                longitudeFirst: true,
                center: [],
                scale: 4000,
                projection: "EPSG:4326",
                dpi: 254,
                height: 550,
                width: 500,
                rotation: 0,
                layers: {
                    type: "WMS",
                    baseURL: "http://localhost:8081/geoserver/wms",
                    layers: ["unicer:base", "unicer:limite", "unicer:edificios"],
                    serverType: "geoserver"
                }
            };
            var contentType, subtitle, parque, season, year, format, datasource;

            this.getFormat = function(){
                return format.key;
            }

            this.setFormat = function(f){
                format = f;
            }

            this.getRequestObject = function(){
                if(format.key === 'csv'){
                    return this._getCsvRequestObj();
                }else{
                    return this._getPdfRequestObj();
                }
            }

            this._getCsvRequestObj = function () {
                return {
                    type: "CSV"
                };
            }

            this._getPdfRequestObj = function () {
                var reqObj = {
                    layout: contentType,
                    outputFormat: "pdf",
                    attributes: {
                        title: "Gestree - Gestão",
                        subtitle: subtitle,
                        map: map,
                        parque: parque,
                        datasource: datasource
                    },
                };
                if (contentType == 'arvores') {
                    reqObj.outputFilename = contentType;
                } else {
                    reqObj.outputFilename = contentType + "_" + season + "_" + year;
                    reqObj.attributes.season = season;
                    reqObj.attributes.year = year;
                };
                return reqObj;
            }

            this.setParque = function (p) {
                parque = p.value;
                if (p.key == 'pedras') {
                    map.center = CENTER_MAPA_PEDRAS;
                } else {
                    map.center = CENTER_MAPA_VIDAGO;
                }
            };

            this.setContentType = function (c) {
                contentType = c.key;
                subtitle = "Impressão de " + c.value;
            };

            this.setSeason = function (s) {
                season = s.value;
            };

            this.setYear = function (y) {
                year = y.value;
            };

            this.setDatasource = function (d) {
                datasource = d;
            }

        }

        return Request;
    }
})();