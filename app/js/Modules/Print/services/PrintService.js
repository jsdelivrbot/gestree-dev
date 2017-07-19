(function () {
    'use strict';

    angular
        .module('PrintModule')
        .service('PrintService', PrintService);

    PrintService.$inject = ['$http'];

    function PrintService($http) {

        this.print = _print;

        function _print(print_options) {
        
        }
        
    };
})();