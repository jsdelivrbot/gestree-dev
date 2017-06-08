(function () {
    'use strict';

    angular
        .module('MainModule', ['unicerApp.configs'])
        .run(['Map', function (Map) {
            Map.setTarget("map");
        }]);
})();