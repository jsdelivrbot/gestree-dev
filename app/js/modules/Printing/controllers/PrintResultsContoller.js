(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('PrintResultController', PrintResultsController);

    PrintResultsController.$inject = ['$scope', 'PrintDetailsService'];

    function PrintResultsController($scope, PrintDetailsService) {
        var printResCtrl = this;
        activate();

        this.newPrint = function () {
            $scope.$parent.$broadcast('resetPrinting');
            PrintDetailsService.resetPrintResults();
        }

        function activate() {
            printResCtrl.printResults = PrintDetailsService.getPrintResults();
            printResCtrl.message1 = "A processar o seu pedido.";
            printResCtrl.message2 = "Por favor aguarde..."
        }
    }
})();