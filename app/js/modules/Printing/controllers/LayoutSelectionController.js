(function () {
    'use strict';

    angular
        .module('PrintingModule')
        .controller('LayoutSelectionController', LayoutSelectionController);

    LayoutSelectionController.$inject = ['$scope', 'PrintDetailsService', '$http', '$q'];

    function LayoutSelectionController($scope, PrintDetailsService, $http, $q) {
        var layoutCtrl = this;
        activate();
        this.change = function () {
            layoutCtrl.noSelect = !layoutCtrl.layouts.some(function (layout) {
                return layout.selected === true;
            });
        }
        this.printLayouts = function () {
            var printConfigs = [];
            layoutCtrl.layouts.forEach(function (layout) {
                if (layout.selected) {
                    printConfigs.push($http.post("https://gistree.espigueiro.pt:3001/geoserver", PrintDetailsService.getPrintSpec(layout.name, layout.type)));
                }
            });
            $q.all(printConfigs).then(function (results) {
                results.forEach(function (res) {
                    var url = "https://gistree.espigueiro.pt:3001/geoserver/pdf?_doc=" + res.data.getURL.split("/").pop();
                    PrintDetailsService.addNewResult({
                        title: res.config.data.mapTitle,
                        url: url
                    });
                });
            });
        }

        $scope.$on('resetPrinting', function () {
            activate();
        });

        function activate() {
            layoutCtrl.layouts = [{
                selected: false,
                name: "Planta de Ordenamento",
                layout: "pdmLayout",
                title: "Planta de Ordenamento",
                escala: 10000,
                type: 'ordenamento',
                tamanho: "A3"
            }, {
                selected: false,
                name: "Planta de Condicionantes",
                layout: "pdmLayout",
                title: "Planta de Condicionantes",
                type: 'condicionantes',
                escala: 10000,
                tamanho: "A3"
            }];
            layoutCtrl.noSelect = true;
        }
    }

})();