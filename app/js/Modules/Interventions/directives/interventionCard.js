(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .directive('interventionCard', interventionCard);

    function interventionCard() {
        var directive = {
            bindToController: true,
            controller: InterventionCardController,
            controllerAs: 'intCardCtrl',
            restrict: 'E',
            scope: {
                intervention: "="
            },
            templateUrl: 'views/templates/intervention-card.html'
        };
        return directive;

    }
    /* @ngInject */
    function InterventionCardController() {
        //console.log(this);
    }
})();