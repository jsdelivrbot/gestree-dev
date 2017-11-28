angular
  .module('unicerApp')
  .controller('LayerIdentifierController', LayerIdentifierController);

LayerIdentifierController.$inject = ['$scope', 'LayerQueryResultsService'];

function LayerIdentifierController($scope, LayerRes) {
  var lrCtrl = this;
  activate();

  lrCtrl.title = "Resultados da Pesquisa";
  $scope.$watchCollection(function () {
    return LayerRes.getResults();
  }, function (res) {
    lrCtrl.results = res;
  });

  lrCtrl.hasResults = function () {
    return lrCtrl.results.length > 0;
  };

  function activate() {
    lrCtrl.results = [];
  };
}