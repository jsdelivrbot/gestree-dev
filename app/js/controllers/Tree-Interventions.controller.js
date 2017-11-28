angular
  .module('unicerApp')
  .controller('TreeInterventionsController', TreeInterventionsController);

TreeInterventionsController.$inject = [
  '$scope',
  'SideNavService',
  'TreeInterventions',
  'SortingService',
  'FilterSharedData',
  '$filter',
];

function TreeInterventionsController($scope, SideNavService, TreeInterventions, SortingService, FilterSharedData, $filter) {
  SideNavService.setActiveTab(3);

  $scope.sort = SortingService.orderBySeasonYear;
  $scope.back = function(e){
    e.preventDefault();
    SideNavService.setActiveTab(1);
    window.history.back();
  }

  $scope.$watch(FilterSharedData.getFilter, _handleFilterUpdate, true);
  function _handleFilterUpdate(newVal, oldVal, scope) {
    scope.interventions = $filter('interventions-filter')(TreeInterventions, newVal);
  }
}