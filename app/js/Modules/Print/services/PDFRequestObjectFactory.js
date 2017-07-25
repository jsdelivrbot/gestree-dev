(function () {
    'use strict';

    angular
        .module('PrintModule')
        .factory('PDFRequestObjectFactory', RequestObject);

    RequestObject.$inject = ['$q', 'InterventionsService']

    function RequestObject($q, InterventionsService) {
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
                layers: [{
                    type: "WMS",
                    baseURL: "http://localhost:8081/geoserver/wms",
                    layers: ["unicer:base", "unicer:limite", "unicer:edificios"],
                    serverType: "geoserver"
                }]
            };
            var contentType, subtitle, parque, season, year, datasource;
            this.getRequestObject = function () {
                var deferred = $q.defer();
                var reqObj = {
                    layout: contentType,
                    outputFormat: "pdf",
                    attributes: {
                        title: "Gestree - Gestão",
                        subtitle: subtitle,
                        map: map,
                        parque: parque.value
                    },
                };
                if (contentType == 'arvores') {
                    reqObj.outputFilename = contentType + "_" + parque.key;
                    reqObj.attributes.datasource = setArvoresDatasource();
                } else {
                    reqObj.outputFilename = contentType + "_" + parque.key + "_" + season + "_" + year;
                    InterventionsService.getInterventionsWithFilter({
                            parque: parque.key,
                            season: season,
                            year: year
                        })
                        .then(function (data) {
                            reqObj.attributes.datasource = setInterventionsDataSource(data);
                            deferred.resolve(reqObj);
                        })
                        .catch(function (error) {
                            console.log(error);
                            deferred.reject();
                        });
                    reqObj.attributes.season = season;
                    reqObj.attributes.year = year;
                };
                return deferred.promise;
            }

            this.setParque = function (p) {
                parque = p;
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
            this.getContentType = function () {
                return contentType;
            }
            this.setSeason = function (s) {
                season = s.value;
            };
            this.setYear = function (y) {
                year = y.value;
            };

            function setInterventionsDataSource(interventions) {
                var returnData;
                var group = interventions.reduce(function (accumulator, item, index, array) {
                    if (accumulator.hasOwnProperty(item.id_tree)) {
                        accumulator[item.id_tree].table.push(item);
                    } else {
                        accumulator[item.id_tree] = {
                            //TODO SEPARATE ID
                            //zone: parseInt(item.id_tree.split(".")[0].match(/\d+/g)[0]),
                            //idTree: parseInt(item.id_tree.split(".")[1].match(/\d+/g)[0]),
                            zone: item.id_tree,
                            idTree: item.id_tree,
                            table: [item]
                        }
                    };
                    return accumulator;
                }, {});
                returnData = Object.values(group);
                for (var i = 0; i < returnData.length; i++) {
                    if (!(returnData[i] instanceof Array)) {
                        returnData[i].table = _getDatasourceTable(returnData[i].table);
                    }
                }
                return returnData;
            }

            function setArvoresDataSource(arvores) {
                datasource = [{
                    title: "Árvores",
                    table: _getDatasourceTable(arvores)
                }];
            }

            function _getDatasourceTable(data) {
                var columns = [];
                for (var prop in data[0]) {
                    if (data[0].hasOwnProperty(prop)) {
                        columns.push(prop);
                    }
                }
                for (var i = 0; i < data.length; i++) {
                    if (!(data[i] instanceof Array)) {
                        data[i] = columns.map(function (key) {
                            if (data[i].hasOwnProperty(key)) {
                                return data[i][key];
                            } else {
                                return null;
                            }
                        })
                    }
                }
                return {
                    columns: columns,
                    data: data
                };
            }
        }

        return Request;
    }
})();