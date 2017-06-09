(function () {
    'use strict';

    angular
        .module('MainModule')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope'];

    function MainController($scope) {
        var mainCtrl = this;

        $scope.$on("controlPanel:panelVisibility", function (e, visibility) {
            e.stopPropagation();
            $scope.cPanelVisibility = visibility;
        });

        init();
        function init() {
            $scope.cPanelVisibility = true;
        }
    }
})();