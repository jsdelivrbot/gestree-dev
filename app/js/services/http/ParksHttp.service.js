angular
  .module('unicerApp')
  .factory('ParksHttp', ParksHttp);

ParksHttp.$inject = ['$http', '$q'];

function ParksHttp($http, $q) {
  return {
    getParks: get
  };

  function get() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/locations'
    }).then(function successCallback(response) {
      deferred.resolve(response.data.features);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
}