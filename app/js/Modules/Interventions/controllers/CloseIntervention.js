(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .controller('CloseInterventionController', CloseInterventionController);

    CloseInterventionController.$inject = ["$timeout", "$location", "InterventionsService", "intervention"];

    function CloseInterventionController($timeout, $location, InterventionsService, intervention) {
        var closeCtrl = this;
        closeCtrl.inter = intervention;
        closeCtrl.close = function (form) {
            closeCtrl.error = '';
            if (form.$invalid) {
                return;
            }
            closeCtrl.inter.state = "FECHADA";
            InterventionsService.closeIntervention(closeCtrl.inter)
                .then(function (data) {
                    console.log("In Close");
                    closeCtrl.message = "A intervenção foi fechada com sucesso.";
                    $timeout(function () {
                        $location.path('/interv');
                    }, 1000);
                }).catch(function (err) {
                    closeCtrl.error = "Ocorreu um erro no fecho da intervenção.";
                });
        };
    }
})();