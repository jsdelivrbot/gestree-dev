(function () {
    'use strict';

    angular
        .module('PrintModule')
        .controller('PrintController', PrintController);

    PrintController.$inject = ['PrintService', '$timeout'];

    function PrintController(PrintService, $timeout) {
        var printCtrl = this;

        printCtrl.reset = function () {
            printCtrl.filter = {};
            printCtrl.printResults = undefined;
        };

        printCtrl.print = function (filter) {
            PrintService.print(filter).then(function (data) {
                console.log("PrintService::Print()", data);
            }).catch(function (err) {
                console.log("PrintService::Print()", err);
            });
        }

        activate();

        function activate() {
            printCtrl.filter = {};
        }
    }
})();