angular
  .module('unicerApp')
  .directive('treeDetails', TreeDetails);

function TreeDetails() {
  var directive = {
    bindToController: true,
    controller: TreeDetailsController,
    controllerAs: 'treeDetailsCtrl',
    scope: {},
    restrict: 'E',
    templateUrl: 'views/templates/components/TreeDetails.html'
  };
  return directive;

  TreeDetailsController.$inject = [
    '$scope', 
    'MapInteractionsService', 
    'TreeDetailsService', 
    'DirtyDataManager'
  ];
  function TreeDetailsController($scope, MapInteractionsService, TreeDetailsService, DirtyDataManager) {

    MapInteractionsService.getSelectInteraction().on('select', TreeDetailsService.getTreeDetails);
    $scope.$watch(TreeDetailsService.getSelectedTree, function (newVal, oldVal, scope) {
      scope.tree = newVal;
      if (scope.tree) {
        if(DirtyDataManager.isTreeDirty()) TreeDetailsService.getTree(scope.tree.gid);    
        scope.visible = true;
        scope.hasInterventions = scope.tree.open_interventions + scope.tree.closed_interventions; 
      } else {
        scope.visible = false;
      }
    });
    $scope.$on('$destroy', function () {
      MapInteractionsService.getSelectInteraction().un('select', TreeDetailsService.getTreeDetails);
    });

  }
};  