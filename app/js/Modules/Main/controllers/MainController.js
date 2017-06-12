(function () {
    'use strict';

    angular
        .module('MainModule')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope'];

    function MainController($scope) {
        var mainCtrl = this;
        var eventPanelVisibility;
        $scope.$on("controlPanel:panelVisibility", function (e, visibility) {
            e.stopPropagation();
            eventPanelVisibility = $scope.cPanelVisibility = visibility;
        });

        $scope.$on("$destroy", function(e){
            eventPanelVisibility();
        });

        init();
        function init() {
            $scope.cPanelVisibility = true;
        }
    }
})();