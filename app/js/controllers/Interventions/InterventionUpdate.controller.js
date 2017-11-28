angular
  .module('unicerApp')
  .controller('InterventionUpdateController', InterventionUpdateController);

InterventionUpdateController.$inject = [
  '$scope',
  'Intervention',
  'Defaults',
  'InterventionsHttp',
  'SideNavService'
];

function InterventionUpdateController($scope, Intervention, Defaults, InterventionsHttp, SideNavService) {
  SideNavService.hide();

  var _initalID = Intervention.id;
  var interTypes = Defaults.types;

  $scope.intervention = Intervention;
  $scope.defaults = Defaults;

  bindSetters();
  setInterventionType();

  $scope.save = function () {
    $scope.intervention.id = _initalID;
    $scope.error = '';
    InterventionsHttp.update($scope.intervention)
      .then(function (data) {
        $scope.message = "A intervenção foi alterada com sucesso.";
      }).catch(function (err) {
        $scope.error = "Ocorreu um erro ao tentar alterar a intervenção";
      });
  }
  $scope.back = function () {
    SideNavService.show();
    window.history.back();
  }

  function bindSetters() {
    $scope.setType = setValue.bind("type");
    $scope.setTeam = setValue.bind("team");
    $scope.setSeason = setValue.bind("season");
    $scope.setYear = setValue.bind("year");
    $scope.setPeriodicity = setValue.bind("periodicity");

    function setValue(val) {
      $scope.intervention[this] = val;
    }
  }
  function setInterventionType(){
    $scope.intervention.type = interTypes.find(function(type){
      return type.id === Intervention.id_type;
    });
  }

}