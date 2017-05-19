(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', 'PrintDetailsService'];

    function FormController($scope, PrintDetailsService) {
        var formCtrl = this;
        activate();

        $scope.$on('resetPrinting', function () {
            activate();
        });

        function activate() {
            formCtrl.userData = {
                requerente: '',
                proprietario: '',
                nif: '',
                freguesia: '',
                local: ''
            }
            PrintDetailsService.setDetails(formCtrl.userData);
        }
    }
})();