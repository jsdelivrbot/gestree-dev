angular
  .module('unicerApp')
  .directive('interventionItem', InterventionItem);

function InterventionItem() {
  var directive = {
    bindToController: true,
    controller: InterventionItemController,
    controllerAs: 'intItemCtrl',
    restrict: 'E',
    scope: {
      intervention: "="
    },
    templateUrl: 'views/templates/components/interventionItem.html'
  };
  return directive;
}

InterventionItemController.$inject = ['$scope', '$location']
function InterventionItemController($scope, $location) {
  var intItemCtrl = this;
  $scope.edit = function () {
    $location.path('/interventions/' + intItemCtrl.intervention.id + '/update');
  };
  $scope.info = function () {
    $location.path('/interventions/' + intItemCtrl.intervention.id + '/info');
  };
  $scope.close = function () {
    $location.path('/interventions/' + intItemCtrl.intervention.id + '/close');
  };
}