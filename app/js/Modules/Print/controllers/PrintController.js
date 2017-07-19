(function () {
    'use strict';

    angular
        .module('PrintModule')
        .controller('PrintController', PrintController);

    PrintController.$inject = ['PrintService', '$timeout'];

    function PrintController(PrintService, $timeout) {
        var printCtrl = this;
        printCtrl.reqObject = {};
        printCtrl.interFilters = false;

        printCtrl.setParque = function (p) {
            printCtrl.reqObject.parque = p;
        };

        printCtrl.setContent = function(c){
            printCtrl.interFilters = (c == 'Intervenções'); 
            printCtrl.reqObject.content = c;
        }

        printCtrl.setSeason = function(s){
            printCtrl.reqObject.season = s;
        }

        printCtrl.setYear = function(y){
            printCtrl.reqObject.year = y;
        }

        printCtrl.setFormat = function(f) {
            printCtrl.reqObject.format = f;
        }

        printCtrl.print = function(){
            // TODO - Validar os Campos (Preenchimento Obrigatório)
        }

        activate();

        function activate() {
            printCtrl.defaults = {
                parques: [
                    'Parque das Pedras',
                    'Vidago Palace Hotel'
                ],
                contents: [
                    'Árvores',
                    'Intervenções'
                ],
                seasons: [
                    'Primavera',
                    'Verão',
                    'Outono',
                    'Inverno'
                ],
                years: [
                    2017,
                    2018,
                    2019,
                    2020,
                    2021
                ],
                formats: [
                    '.csv (Comma Separated Values)',
                    '.pdf (Printable Document Format)'
                ]
            }
        }
    }
})();