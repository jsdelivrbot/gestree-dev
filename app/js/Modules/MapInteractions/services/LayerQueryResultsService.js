(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .service('LayerQueryResultsService', LayerQueryResultsService);

    LayerQueryResultsService.$inject = ['$http'];

    function LayerQueryResultsService($http) {
        var _results = [];

        this.getResults = getResults;
        this.getLayersInfo = getLayersInfo;
        this.clearResults = clearResults;

        function getLayersInfo(evt, view, layers) {
            layers.forEach(function (layer) {              
                if (layer.isQueryable()) {
                    var url = layer.getSource().getGetFeatureInfoUrl(
                        ol.proj.transform(evt.coordinate, "EPSG:3857", ol.proj.get('EPSG:27493')),
                        view.getResolution(),
                        ol.proj.get('EPSG:27493'), {
                            'INFO_FORMAT': 'application/json'
                        });
                    if (url) {
                        clearResults();
                        var parser = new ol.format.GeoJSON();
                        $http({
                            url: url,
                        }).then(function (response) {
                            if (response.data.features.length > 0) {
                                _results.push(response.data);
                            }
                        });
                    }
                }
            });
        }

        function getResults() {
            return _results;
        }

        function clearResults() {
            _results.length = 0;
        }


    }
})();