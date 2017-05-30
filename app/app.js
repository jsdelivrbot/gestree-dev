(function () {
    'use strict';

    angular.module('unicerApp', [
            'ngMaterial',
            'MapModule',
            'LegendsModule',
            'MapInteractionsModule',
            'InterventionsModule',
            /*'PrintingModule',
            'SearchLocationModule',
            'BaseDocumentalModule',
            'ngDialog'*/
        ])
        .config(['$mdThemingProvider', function ($mdThemingProvider) {
            $mdThemingProvider.definePalette('whiteGreen', {
                '50': '5cb85c',
                '100': '000000',
                '200': '5cb85c',
                '300': '5cb85c',
                '400': '5cb85c',
                '500': '5cb85c',
                '600': '5cb85c',
                '700': '5cb85c',
                '800': '5cb85c',
                '900': '5cb85c',
                'A100': 'ffffff',
                'A200': '000000',
                'A400': '000000',
                'A700': '000000',
                'contrastDefaultColor': 'light', // whether, by default, text (contrast)
                // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                    '200', '300', '400', 'A100'
                ],
                'contrastLightColors': undefined // could also specify this if default was 'dark'
            });
            $mdThemingProvider.theme('default')
                .primaryPalette('green')
                .backgroundPalette('whiteGreen');
        }])
        .constant('CONFIG', {
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