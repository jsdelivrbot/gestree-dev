(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .factory('LocationsService', LocationsService);

    LocationsService.$inject = ['$http', '$q'];

    function LocationsService($http, $q) {
        var locationsFac = {
            get: _getParques
        };

        return locationsFac;

        function _getParques() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/locations'
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();