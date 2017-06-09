(function () {
    'use strict';

    angular.module('unicerApp', [
            'MainModule',
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
                'contrastDefaultColor': 'light',
                'contrastDarkColors': ['50', '100',
                    '200', '300', '400', 'A100'
                ],
                'contrastLightColors': undefined
            });
            $mdThemingProvider.theme('default')
                .primaryPalette('green')
                .backgroundPalette('whiteGreen');
        }]);
})();