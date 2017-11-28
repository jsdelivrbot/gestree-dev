angular
  .module('unicerApp')
  .service('LayersHttp', LayersHttp);

LayersHttp.$inject = ['$q', '$http', 'GlobalURLs'];

function LayersHttp($q, $http, GlobalURLs) {

  return {
    fetch: fetch,
    fetchInfo: fetchInfo
  };

  function fetch(data) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: GlobalURLs.host+'/geoserver/wfs',
      params: data
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  }
  function fetchInfo(layer, coordinate, view) {
    var deferred = $q.defer();
    var url = layer.getSource().getGetFeatureInfoUrl(
      ol.proj.transform(coordinate, "EPSG:3857", ol.proj.get('EPSG:27493')),
      view.getResolution(),
      ol.proj.get('EPSG:27493'), {
        'INFO_FORMAT': 'application/json'
      });
    $http({
      method: 'GET',
      url: url
    }).then(function (response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  }

}