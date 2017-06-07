(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .factory('InterventionTypesFactory', InterventionTypesFactory);

    InterventionTypesFactory.$inject = ["$q", "$http"];

    function InterventionTypesFactory($q, $http) {
        return {
            get: _get
        };

        function _get() {
            var deferred = $q.defer();
            deferred.resolve([1, 2, 3, 4, 5, 6]);
            return deferred.promise;
        }
    }
})();