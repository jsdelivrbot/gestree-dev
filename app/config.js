(function () {
    'use strict';

    angular.module('unicerApp.configs', [])
        .constant('Globals', {
            'ENVIRONMENT': 'Development',
            'URL_WMS': {
                'development': "http://localhost:3002/geoserver/wms",
                'production': "/geoserver/wms"
            },
            'URL_WFS': {
                'development': "http://localhost:3002/geoserver/wfs",
                'production': "/geoserver/wfs"
            },
            'URL_PRINT': {
                'development': "http://localhost:3002/geoserver/pdf",
                'production': "/geoserver/pdf"
            }
        });
})();