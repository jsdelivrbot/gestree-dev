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
            templateUrl: 'views/templates/interventions/intervention-card.html'
        };
        return directive;

    }

    InterventionCardController.$inject = [];

    /* @ngInject */
    function InterventionCardController() {
        var intCardCtrl = this;

        intCardCtrl.closeIntervention = function () {
            
            //intCardCtrl.intervention.state = "FECHADA";
        }


    }
})();