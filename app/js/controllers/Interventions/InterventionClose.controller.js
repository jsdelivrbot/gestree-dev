angular
  .module('unicerApp')
  .controller('InterventionCloseController', InterventionCloseController);

InterventionCloseController.$inject = [
  '$scope',
  'Intervention',
  'InterventionsHttp',
  '$timeout',
  'SideNavService'
];

function InterventionCloseController($scope, Intervention, InterventionsHttp, $timeout, SideNavService) {
  $scope.intervention = Intervention;
  SideNavService.hide();

  $scope.back = function () {
    SideNavService.show();
    window.history.back();
  }
  $scope.close = function (form) {
    var _self = this;
    _self.error = '';
    if (form.$invalid) {
      return;
    }
    _self.intervention.state = "FECHADA";
    InterventionsHttp.close(_self.intervention)
      .then(function (data) {
        _self.message = "A intervenção foi fechada com sucesso.";
        $timeout(function () {
          window.history.back();
          SideNavService.show();
        }, 1000);
      }).catch(function (err) {
        _self.error = "Ocorreu um erro no fecho da intervenção.";
      });
  };
}