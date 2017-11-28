angular
  .module('unicerApp')
  .service('PrintHttp', PrintHttp);

PrintHttp.$inject = ['GlobalURLs', '$q', '$http', '$timeout'];

function PrintHttp(GlobalURLs, $q, $http, $timeout) {

  return {
    printTrees: print,
    printInterventions: print
  };

  function print(requestData) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: GlobalURLs.print,
      data: requestData,
    })
      .then(function (response) {
        return response.data.statusURL;
      })
      .then(_checkStatus)
      .then(function (res) {
        deferred.resolve(GlobalURLs.host + res.downloadURL);
      })
      .catch(function (err) {
        deferred.reject(err);
      });
    return deferred.promise;
  }
  function _checkStatus(statusURL) {
    var deferred = $q.defer();
    _fetchData();
    function _fetchData() {
      $http({
        method: 'GET',
        url: GlobalURLs.host + statusURL
      }).then(function (res) {
        if (res.data.done) {
          deferred.resolve(res.data);
        } else {
          $timeout(function () {
            _fetchData();
          }, 1500);
        }
      });
    }
    return deferred.promise;
  }

};