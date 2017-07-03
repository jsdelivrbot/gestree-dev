(function () {
    'use strict';

    angular
        .module('PrintModule')
        .service('PrintService', PrintService);

    PrintService.$inject = ['$http', '$q', 'Map'];

    function PrintService($http, $q, Map) {
        var deferred = $q.defer();

        console.log("Center", ol.proj.transform(Map.map.getView().getCenter(), 'EPSG:3857', ol.proj.get('EPSG:27493')));
        this.print = _print;

        function _print(print_options) {
            var defaultSpec = {
                layout: "gestreeLayout",
                srs: "EPSG:27493",
                units: "m",
                outputFormat: "pdf",
                mapTitle: "Gestree - Intervenções",
                layers: [{
                    type: "WMS",
                    format: "image/png",
                    layers: [
                        "unicer:limite",
                        "unicer:base",
                        "unicer:edificios"
                    ],
                    baseURL: "http://gistree.espigueiro.pt:8081/geoserver/wms"
                }, {
                    type: "WMS",
                    format: "image/png",
                    layers: [
                        "unicer:arvores"
                    ],
                    baseURL: "http://gistree.espigueiro.pt:8081/geoserver/wms",
                    styles: ["treeIntervention"]
                }],
                pages: [{
                    center: ol.proj.transform(Map.map.getView().getCenter(), 'EPSG:3857', ol.proj.get('EPSG:27493')),
                    scale: 1500,
                    dpi: 300,
                }]
            };
            var printSpec = angular.extend(defaultSpec, print_options);
            $http.post("http://gistree.espigueiro.pt:8081/geoserver/pdf/create.json", printSpec).then(function successCallback(response) {
                console.log("Response", response);
                deferred.resolve(response);
            }, function errorCallback(err) {
                console.log("Error", err);
                deferred.reject(err);
            });
            return deferred.promise;
        };
    };
})();