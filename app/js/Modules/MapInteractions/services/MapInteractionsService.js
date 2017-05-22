(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .service('MapInteractionsService', MapInteractionsService)

    MapInteractionsService.$inject = ['MapService', 'LayerQueryResultsService', '$http'];

    function MapInteractionsService(MapService, LayerQueryResultsService, $http) {
        var data = {
            interaction: '',
            interactionText: ''
        };

        this.setMapInteraction = function (interaction) {
            MapService.map.getInteractions().pop();
            switch (interaction) {
                case 'DragPan':
                    data.interactionText = 'Mover Mapa';
                    MapService.map.addInteraction(new ol.interaction.DragPan());
                    break;
                case 'ZoomIn':
                    data.interactionText = 'Aproximar Mapa';
                    MapService.map.addInteraction(new ol.interaction.Pointer({
                        handleDownEvent: function (e) {
                            var view = MapService.map.getView();
                            view.setCenter(e.coordinate);
                            view.setZoom(view.getZoom() + 1);
                        }
                    }));
                    break;
                case 'ZoomOut':
                    data.interactionText = 'Afastar Mapa';
                    MapService.map.addInteraction(new ol.interaction.Pointer({
                        handleDownEvent: function (e) {
                            var view = MapService.map.getView();
                            view.setCenter(e.coordinate);
                            view.setZoom(view.getZoom() - 1);
                        }
                    }));
                    break;
                case 'ZoomBox':
                    data.interactionText = 'Fazer Zoom de Caixa';
                    MapService.map.addInteraction(new ol.interaction.DragZoom({
                        condition: ol.events.condition.always,
                        className: 'drag_zoom_box'
                    }));
                    break;
                case 'Identify':
                    data.interactionText = 'Identificar Camadas';
                    MapService.map.addInteraction(new ol.interaction.Pointer({
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