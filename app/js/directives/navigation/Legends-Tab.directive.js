angular
  .module('unicerApp')
  .directive('legendsTab', LegendsTab);

function LegendsTab() {
  var directive = {
    bindToController: true,
    controller: LegendsTabController,
    controllerAs: 'lgCtrl',
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/navigation/tabs/Tab-Legends.html'
  };
  return directive;
  
  LegendsTabController.$inject = ['$scope', 'LegendsService'];
  function LegendsTabController($scope, LegendsService) {
    $scope.groups = LegendsService.getLegends();
  }
}