(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .directive('interventionItem', InterventionItem);

    function InterventionItem() {
        var directive = {
            bindToController: true,
            controller: 'InterventionItemController',
            controllerAs: 'intItemCtrl',
            restrict: 'E',
            scope: {
                intervention: "="
            },
            templateUrl: 'views/templates/interventions/interventionItem.html'
        };
        return directive;
    }

})();