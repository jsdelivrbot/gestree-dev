angular
  .module('unicerApp')
  .controller('InterventionInfoController', InterventionInfoController);

InterventionInfoController.$inject = [
  '$scope',
  'Intervention',
  'SideNavService'
];

function InterventionInfoController($scope, Intervention, SideNavService) {
  SideNavService.hide();
  $scope.intervention = Intervention;
  $scope.back = function () {
    SideNavService.show();
    window.history.back();
  }
}