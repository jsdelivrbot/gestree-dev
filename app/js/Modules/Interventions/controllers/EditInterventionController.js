(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .controller('EditInterventionController', EditInterventionController);

    EditInterventionController.$inject = ['intervention'];

    function EditInterventionController(intervention) {
        var editCtrl = this;

        activate();

        function activate() {
            editCtrl.inter = intervention;
        }
    }
})();