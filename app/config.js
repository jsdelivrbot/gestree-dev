(function () {
    'use strict';

    angular.module('unicerApp.configs', [])
        .constant('Globals', {
            'ENVIRONMENT': 'Development',
            'URL_WMS': {
                'Development': "http://localhost:3000/geoserver/wms",
                'Production': "http://gistree.espigueiro.pt:3001/geoserver"
            },
            'URL_WFS': {
                'Development': "http://localhost:3000/geoserver/wfs",
                'Production': "http://gistree.espigueiro.pt:3001/geoserver"
            },
            'URL_PRINT': {
                'Development': "http://localhost:3000/geoserver/pdf",
                'Production': "http://gistree.espigueiro.pt:3001/geoserver"
            }
        });
})();