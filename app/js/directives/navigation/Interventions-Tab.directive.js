angular
  .module('unicerApp')
  .directive('interventionsTab', InterventionsTab);

function InterventionsTab() {
  var directive = {
    bindToController: true,
    controller: InterventionsTabController,
    controllerAs: 'intTabCtrl',
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/navigation/tabs/Tab-Interventions.html'
  };
  return directive;
}

InterventionsTabController.$inject = [
  '$scope',
  'DefaultInterventionData',
  'FilterSharedData',
  'SideNavService'
];

function InterventionsTabController($scope, Defaults, FilterSharedData, SideNavService) {

  $scope.filterData = {
    state: "ABERTA"
  };
  $scope.data = {};
  Defaults.getInterventionDefaults().then(function (defaults) {
    $scope.defaults = defaults;
  });

  $scope.setIdTree = setIdTree;
  $scope.setInterType = setInterType;
  $scope.setSeason = setSeason;
  $scope.setYear = setYear;
  $scope.resetFilter = resetFilter;

  $scope.$watch('filterData', function (newVal, oldVal) {
    FilterSharedData.setFilter(newVal);
  }, true);
  $scope.$watch(SideNavService.getActiveTab, function (activeTab, oldVal, scope) {
    if (activeTab === 3) {
      resetFilter.call(scope);   
    }
  }, true);

  function setIdTree(idTree) {
    if (idTree === null) {
      delete (this.filterData.id_tree);
    }
  }
  function setInterType(type) {
    this.filterData.id_type = type.id;
    this.data.typeName = type.value;
  }
  function setSeason(season) {
    this.filterData.season = season;
  }
  function setYear(year) {
    this.filterData.year = year;
  }
  function resetFilter() {
    this.data = {};
    this.filterData = {
      state: "ABERTA"
    };
  }

}