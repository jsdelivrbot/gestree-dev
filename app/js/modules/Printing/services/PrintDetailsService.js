(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .service('PrintDetailsService', PrintDetailsService);

    PrintDetailsService.$inject = ['MapService'];

    function PrintDetailsService(MapService) {
        var _layers = {
            "Planta de Ordenamento": [{
                type: "WMS",
                format: "image/png",
                layers: [
                    "cmvrpostgis:solo_rural",
                    "cmvrpostgis:solo_urbano",
                    "cmvrpostgis:solo_de_urbanizacao_programada",
                    "cmvrpostgis:estrutura_ecologica_urbana",
                    "cmvrpostgis:outras_instalacoes",
                    "cmvrpostgis:zonas_de_protecao_ao_aerodromo"
                ],
                baseURL: "http://gistree.espigueiro.pt:8081/geoserver/wms",
                customParams: {

                }
            }],
            "Planta de Condicionantes": [{
                type: "WMS",
                format: "image/png",
                layers: [
                    "cmvrpostgis:reserva_agricola_nacional",
                    "cmvrpostgis:reserva_ecologica_nacional",
                    "cmvrpostgis:zonas_inundaveis",
                    "cmvrpostgis:pedreiras",
                    "cmvrpostgis:limite_da_rede_natura_2000",
                    "cmvrpostgis:aerodromo",
                    "cmvrpostgis:linhas_de_alta_tensao",
                    "cmvrpostgis:abastecimento_de_aguas_adutoras",
                    "cmvrpostgis:rede_rodoviaria",
                    "cmvrpostgis:rede_rodoviaria_prevista",
                    "cmvrpostgis:rede_ferroviaria",
                    "cmvrpostgis:vertices_geodesicos"
                ],
                baseURL: "http://gistree.espigueiro.pt:8081/geoserver/wms",
                customParams: {

                }
            }]
        };
        var _printResults = [];
        var _details = {};
        // TODO
        this.addNewResult = function (res) {
            _printResults.push(res);
        }
        this.getPrintResults = function () {
            return _printResults;
        }
        this.resetPrintResults = function () {
            _printResults.splice(0, _printResults.length);
        }
        this.setDetails = function (details) {
            _details = details;
        }
        this.getDetails = function () {
            return _details;
        }
        this.getPrintSpec = function (mapTitle, type) {
            var defaultLayout = {
                layout: "pdmLayout",
                srs: "EPSG:27493",
                units: "m",
                outputFormat: "pdf",
                mapTitle: mapTitle,
                type: type,
                layers: [],
                pages: [{
                    center: ol.proj.transform(MapService.map.getView().getCenter(), 'EPSG:3857', ol.proj.get('EPSG:27493')),
                    scale: 10000,
                    dpi: 300,
                }]
            };
            defaultLayout.outputFilename = mapTitle.split(" ").join("_");
            defaultLayout.pages[0].MapTitle = mapTitle;
            angular.copy(_layers[mapTitle], defaultLayout.layers);
            if (!angular.equals(MapService.userFeatures, {})) {
                defaultLayout.layers.push({
                    "type": "Vector",
                    "styles": {
                        "": {
                            "strokeColor": "#000000",
                            "strokeWidth": "2",
                            "fillColor": "#ae0000",
                            "fillOpacity": 0.7
                        }
                    },
                    "opacity": "0.8",
                    "geoJson": JSON.parse(MapService.userFeatures)
                });
            }
            angular.extend(defaultLayout.pages[0], _details);
            return defaultLayout;
        }
    }
})();