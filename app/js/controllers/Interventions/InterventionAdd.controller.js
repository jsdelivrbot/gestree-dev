angular
  .module('unicerApp')
  .controller('InterventionAddController', InterventionAddController);

InterventionAddController.$inject = [
  '$scope',
  '$routeParams',
  '$timeout',
  'InterventionsHttp',
  'Defaults',
  'SideNavService'
];

function InterventionAddController($scope, $routeParams, $timeout, InterventionsHttp, Defaults, SideNavService) {
  SideNavService.hide();

  $scope.defaults = Defaults;
  $scope.intervention = {
    periodicity: '-',
    comments: null,
    team: '-'
  };
  
  if ($routeParams.idTree) {
    $scope.intervention.id_tree = parseInt($routeParams.idTree);
    $scope.intervention.park = Defaults.findPark($routeParams.park);
    $scope.disableID = true;
  }

  $scope.back = _goBack;
  
  $scope.send = function () {
    var _self = this;
    if (!_dataIsInvalid()) {
      return;
    }
    InterventionsHttp.add(this.intervention)
      .then(function (res) {
        _self.error = "";
        _self.message = "Intervenção adicionada com sucesso.";
        $timeout(function () {
          _goBack();
        }, 1000);
      }).catch(function (err) {
        _self.error = "Ocorreu um erro ao adicionar a intervenção.";
      });
  }

  bindSetters()
  function bindSetters() {
    $scope.setType = setValue.bind("type");
    $scope.setTeam = setValue.bind("team");
    $scope.setSeason = setValue.bind("season");
    $scope.setYear = setValue.bind("year");
    $scope.setPeriodicity = setValue.bind("periodicity");
    $scope.setPark = setValue.bind("park");
    function setValue(val) {
      $scope.intervention[this] = val;
    }
  }
  function _dataIsInvalid() {
    var errors = { size: 0 };
    var requiredFields = ['id_tree', 'park', 'type', 'priority', 'season', 'year'];
    requiredFields.map(function (field, index) {
      if (!$scope.intervention.hasOwnProperty(field)) {
        errors[field] = true;
        errors.size++;
      }
    });
    if (errors.size > 0) {
      errors.message = "* Falta Preencher Campos Obrigatórios";
    }
    $scope.errors = errors;
    return errors.size === 0;
  }
  function _goBack(){
    SideNavService.show();
    window.history.back();
  }

}