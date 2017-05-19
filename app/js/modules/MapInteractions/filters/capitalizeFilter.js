(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .filter('capitalize', Filter);

    function Filter() {
        return function (input) {
            if (!angular.isNumber(input)) {
                return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            }else{
                return input;
            }

        }
    }
})();