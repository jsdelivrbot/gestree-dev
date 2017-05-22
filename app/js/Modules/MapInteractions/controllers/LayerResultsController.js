(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .controller('LayerResultsController', LayerResultsController);

    LayerResultsController.$inject = ['$scope', 'LayerQueryResultsService'];

    function LayerResultsController($scope, LayerRes) {
        var lrCtrl = this;
        activate();

        lrCtrl.title = "Resultados da Pesquisa";
        $scope.$watchCollection(function () {
            return LayerRes.getResults();
        }, function (res) {
            lrCtrl.results = res;
        });

        lrCtrl.hasResults = function () {
            return lrCtrl.results.length > 0;
        };

        function activate() {
            lrCtrl.results = [];
        };
    }
})();