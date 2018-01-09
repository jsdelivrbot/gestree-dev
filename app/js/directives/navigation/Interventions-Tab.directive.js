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

  $scope.setZone= setZone;
  $scope.setIdTree = setIdTree;
  $scope.setInterType = setInterType;
  $scope.setSeason = setSeason;
  $scope.setYear = setYear;
  $scope.resetFilter = resetFilter;

  $scope.$watch('filterData.parque', function (newVal, oldVal, scope) {
    if (newVal) {
      scope.defaults.parks.forEach(function (el) {
        if (el.name === newVal) scope.zones = el.zones;
      })
    } else {
      delete (scope.filterData.parque);
    }
  }, true);

  $scope.$watch('filterData.priority', function (newVal, oldVal, scope) {
    if (!newVal) {
      delete (scope.filterData.priority);
    }
  }, true);

  $scope.$watch('filterData', function (newVal, oldVal) {
    FilterSharedData.setFilter(newVal);
  }, true);
  $scope.$watch(SideNavService.getActiveTab, function (activeTab, oldVal, scope) {
    if (activeTab === 3) {
      resetFilter.call(scope);
    }
  }, true);

  function setZone(zone) {
    if (zone.id !== 0) {
      this.filterData.zone_id = zone.id;
    } else {
      delete (this.filterData.zone_id);
    }
    this.data.zone = zone.nome;
  }
  function setIdTree(idTree) {
    if (idTree === null) {
      delete (this.filterData.id_tree);
    }
  }
  function setInterType(type) {
    if (type.value !== ' -- ') {
      this.filterData.id_type = type.id;
    } else {
      delete (this.filterData.id_type);
    }
    this.data.typeName = type.value;
  }
  function setSeason(season) {
    if (season !== ' -- ') {
      this.filterData.season = season;
    } else {
      delete (this.filterData.season);
    }

  }
  function setYear(year) {
    if (year !== ' -- ') {
      this.filterData.year = year;
    } else {
      delete (this.filterData.year);
    }
  }
  function resetFilter() {
    this.data = {};
    this.filterData = {
      state: "ABERTA"
    };
  }

}