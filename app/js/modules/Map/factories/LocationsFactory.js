(function () {
    'use strict';

    angular
        .module('MapModule')
        .factory('LocationsFactory', LocationsFactory);

    LocationsFactory.$inject = ['$http'];

    function LocationsFactory($http) {
        var locationsFac = {
            getFreguesias: getFreguesias,
            getLocalidades: getLocalidades
        };

        return locationsFac;

        function getFreguesias(callback) {
            $http({
                method: 'GET',
                url: '/api/freguesias'
            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                console.error(response);
            });
        }
        function getLocalidades(callback) {
            $http({
                method: 'GET',
                url: '/api/localidades'
            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                console.error(response);
            });
        }
    }
})();