(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .service('InterventionsService', InterventionsService);

    InterventionsService.$inject = ['$q', '$http'];

    function InterventionsService($q, $http) {
        this.getAllInterventions = _getAllInterventions;
        this.getIntervention = _getIntervention;
        this.closeIntervention = _closeIntervention;
        this.updateIntervention = _updateIntervention;

        function _getAllInterventions() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/interventions'
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function _getIntervention(id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'api/interventions/' + id
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function _updateIntervention(inter) {
            var deferred = $q.defer();
            $http({
                method: 'PUT',
                url: 'api/interventions/' + inter.id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: inter
            }).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function _closeIntervention(inter) {
           return _updateIntervention(inter);
        };
    }
})();