(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .service('InterventionsService', InterventionsService);

    InterventionsService.$inject = ['$q', '$http'];

    function InterventionsService($q, $http) {
        this.getAllInterventions = _getAllInterventions;

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
        }
    }
})();