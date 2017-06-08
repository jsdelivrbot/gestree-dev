(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .service('MapInteractionsService', MapInteractionsService)

    MapInteractionsService.$inject = ['Map', 'LayerQueryResultsService', '$http'];

    function MapInteractionsService(Map, LayerQueryResultsService, $http) {
        var data = {
            interaction: '',
            interactionText: ''
        };
        var map = Map.getMapObject();
        this.setMapInteraction = function (interaction) {
            map.getInteractions().pop();
            switch (interaction) {
                case 'DragPan':
                    data.interactionText = 'Mover Mapa';
                    map.addInteraction(new ol.interaction.DragPan());
                    break;
                case 'ZoomIn':
                    data.interactionText = 'Aproximar Mapa';
                    map.addInteraction(new ol.interaction.Pointer({
                        handleDownEvent: function (e) {
                            var view = map.getView();
                            view.setCenter(e.coordinate);
                            view.setZoom(view.getZoom() + 1);
                        }
                    }));
                    break;
                case 'ZoomOut':
                    data.interactionText = 'Afastar Mapa';
                    map.addInteraction(new ol.interaction.Pointer({
                        handleDownEvent: function (e) {
                            var view = map.getView();
                            view.setCenter(e.coordinate);
                            view.setZoom(view.getZoom() - 1);
                        }
                    }));
                    break;
                case 'ZoomBox':
                    data.interactionText = 'Fazer Zoom de Caixa';
                    map.addInteraction(new ol.interaction.DragZoom({
                        condition: ol.events.condition.always,
                        className: 'drag_zoom_box'
                    }));
                    break;
                case 'Identify':
                    data.interactionText = 'Identificar Camadas';
                    map.addInteraction(new ol.interaction.Pointer({
                        handleDownEvent: function (evt) {
                            LayerQueryResultsService.getLayersInfo(evt, evt.map.getView(), evt.map.getLayers().getArray());
                        }
                    }));
                    break;
            }
            data.interaction = interaction;
        };
        this.getMapInteraction = function () {
            return data.interaction;
        };

        this.getText = function () {
            return data.interactionText;
        }

        this.setText = function (t) {
            data.interactionText = t;
        }
    }

})();