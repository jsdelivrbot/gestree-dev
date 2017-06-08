(function () {
    'use strict';

    angular
        .module('InterventionsModule')
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
            templateUrl: 'views/templates/interventions/interventionItem.html'
        };
        return directive;
    }

    InterventionItemController.$inject = ['$scope', '$location']

    /* @ngInject */
    function InterventionItemController($scope, $location) {
        var intItemCtrl = this;
        intItemCtrl.edit = function () {
            $location.path('/interv/' + intItemCtrl.intervention.id + '/edit');
        };

        intItemCtrl.info = function () {
            $location.path('/interv/' + intItemCtrl.intervention.id + '/info');
        };

        intItemCtrl.close = function () {
            $location.paht('/interv/' + intItemCtrl.intervention.id + '/close');
        };
    }
})();