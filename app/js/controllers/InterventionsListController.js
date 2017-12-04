angular
  .module('unicerApp')
  .controller('InterventionListController', InterventionListController);

InterventionListController.$inject = [
  '$scope',
  'Interventions',
  'SortingService',
  'FilterSharedData',
  '$filter'
];

function InterventionListController($scope, Interventions, SortingService, FilterSharedData, $filter) {

  $scope.sort = SortingService.orderBySeasonYear;

  $scope.$watch(FilterSharedData.getFilter, _handleFilterUpdate, true);
  function _handleFilterUpdate(newVal, oldVal, scope) {
    scope.interventions = $filter('interventions-filter')(Interventions, newVal);
  }

};