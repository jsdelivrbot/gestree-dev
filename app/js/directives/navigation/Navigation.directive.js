angular
  .module('unicerApp')
  .directive('sideNav', SideNav);

function SideNav() {
  var directive = {
    bindToController: true,
    controller: SideNavController,
    controllerAs: 'SideNavCtrl',
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/navigation/navigation.html'
  };
  return directive;

  SideNavController.$inject = ['$rootScope', '$scope', 'SideNavService', 'MapService', '$timeout'];
  function SideNavController($rootScope, $scope, SideNavService, MapService, $timeout) {

    $scope.hideNavigation = SideNavService.hideNavigation;
    $scope.showNavigation = SideNavService.showNavigation;
    $scope.setActiveTab = SideNavService.setActiveTab;
    $scope.isActiveTab = SideNavService.isActiveTab;

    $scope.$watch(SideNavService.isVisible, _changeVisibility, false);
    function _changeVisibility(newVal, oldVal, scope) {
      scope.navigationVisibility = newVal;
      $rootScope.navigationVisibility = newVal;
      MapService.drawMap();
    };

  }
}