(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .controller('InterventionItemController', InterventionItemController);

    InterventionItemController.$inject = ['$scope', '$location']

    function InterventionItemController($scope, $location) {
        var intItemCtrl = this;
        intItemCtrl.edit = function () {
            $location.path('/interv/' + intItemCtrl.intervention.id + '/edit');
        };

        intItemCtrl.info = function () {
            $location.path('/interv/' + intItemCtrl.intervention.id + '/info');
        };

        intItemCtrl.close = function () {
            $location.path('/interv/' + intItemCtrl.intervention.id + '/close');
        };
    }
})();