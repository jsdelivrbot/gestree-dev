(function () {
    'use strict';

    angular
        .module('DrawingModule')
        .controller('DrawingController', DrawingController);

    DrawingController.$inject = ['$scope', 'MapService', 'MapInteractionsService']

    function DrawingController($scope, MapService, MapInteractionsService) {
        var drawCtrl = this;
        var geojson, _style, _revStyle, _source, _vector, _draw;
        var _map = MapService.map;
        var _mps = MapInteractionsService;
        var _defaultInfo = "Utilize os botões para definir o tipo de desenho desejado."

        activate();

        drawCtrl.setDrawingMode = function (dM) {
            _mps.setMapInteraction('DragPan');
            _setInformationText(dM);
            _map.removeInteraction(_draw);
            _map.removeLayer(_vector);
            _draw = new ol.interaction.Draw({
                source: _source,
                style: _revStyle,
                type: dM
            });
            _map.addInteraction(_draw);
            _draw.once('drawend', function (evt) {
                evt.feature.set('type', evt.feature.getGeometry().getType());
                MapService.map.removeInteraction(_draw);
                drawCtrl.info = _defaultInfo;
                $scope.$apply();
            });
            _map.addLayer(_vector);
        }

        drawCtrl.clearDraw = function () {
            _map.removeLayer(_vector);
            _vector.getSource().clear();
        }

        $scope.$on('resetPrinting', function () {
            drawCtrl.clearDraw();
        });

        function _setInformationText(dM) {
            switch (dM) {
                case 'Point':
                    drawCtrl.info = "Para desenhar um ponto, faça clique no mapa.";
                    break;
                case 'LineString':
                    drawCtrl.info = "Para desenhar uma linha, vá clicando no mapa. Duplo clique termina a linha.";
                    break;
                case 'Polygon':
                    drawCtrl.info = "Para desenhar um polígono, vá clicando no mapa. Duplo clique fecha o polígono.";
                    break;
            }
        }

        function activate() {
            geojson = new ol.format.GeoJSON({
                featureProjection: ol.proj.get("EPSG:27493")
            });
            _style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(174, 0, 0, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0,0,0,0.75)',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: 'rgba(174, 0, 0, 0.3)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0,0,0,0.75)'
                    })
                })
            });
            _revStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(174,0,0,0.75)',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: 'rgba(174,0,0,0.75)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(255, 255, 255, 0.3)'
                    })
                })
            });
            _source = new ol.source.Vector({
                wrapX: false
            });
            _source.on('addfeature', function () {
                MapService.userFeatures = geojson.writeFeatures(_vector.getSource().getFeatures(), {
                    dataProjection: ol.proj.get("EPSG:27493"),
                    featureProjection: "EPSG:3857"
                });
            });
            _vector = new ol.layer.Vector({
                source: _source,
                style: _style
            });
            drawCtrl.info = _defaultInfo;
        }
    }
})();