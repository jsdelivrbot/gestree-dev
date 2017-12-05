angular
  .module('unicerApp')
  .service('InterventionsHttp', InterventionsHttp);

InterventionsHttp.$inject = ['$q', '$http', 'DirtyDataManager'];

function InterventionsHttp($q, $http, DirtyDataManager) {

  return {
    add: add,
    getAll: getAll,
    get: get,
    getFilteredInterventions: getFilteredInterventions,
    update: update,
    close: close
  };

  function add(inter) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/trees/' + inter.park.name + '/' + inter.id_tree + '/interventions',
      data: _prepareData(inter)
    }).then(function (response) {
      DirtyDataManager.setDirty();
      deferred.resolve(response.data);
    }, function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  function getAll() {
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
  function get(id) {
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
  }
  function getFilteredInterventions(filter) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'api/interventions/filter',
      headers: {
        'Content-Type': 'application/json'
      },
      params: filter
    }).then(function successCallback(response) {
      deferred.resolve(response.data);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  function update(inter) {
    return _updateRequest(_prepareData(inter));
  }
  function close(inter) {
    return _updateRequest(inter);
  }

  function _updateRequest(inter) {
    var deferred = $q.defer();
    $http({
      method: 'PUT',
      url: 'api/interventions/' + inter.id,
      headers: {
        'Content-Type': 'application/json'
      },
      data: inter
    }).then(function successCallback(response) {
      DirtyDataManager.setDirty();
      deferred.resolve(response.data);
    }, function errorCallback(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
  function _prepareData(inter) {
    return Object.assign({}, inter,{ id_type: inter.type.id });
  }

}