(function () {
    'use strict';

    angular.module('unicerApp.configs', [])
        .constant('Globals', {
            'ENVIRONMENT': 'Development',
            'URL_WMS': {
                'Development': "http://localhost:3002/geoserver/wms",
                'Production': "http://gistree.espigueiro.pt:3002/geoserver/wms"
            },
            'URL_WFS': {
                'Development': "http://localhost:3002/geoserver/wfs",
                'Production': "http://gistree.espigueiro.pt:3002/geoserver/wfs"
            },
            'URL_PRINT': {
                'Development': "http://localhost:3002/geoserver/pdf",
                'Production': "http://gistree.espigueiro.pt:3002/geoserver/pdf"
            }
        });
})();