(function () {
    'use strict';

    angular
        .module('MapModule')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$rootScope', '$scope'];

    function TabsController($rootScope, $scope) {
        var tc = this;
        tc.showMap = function () {
            $rootScope.mapVisibility = true;
        };
        tc.hideMap = function () {
            $rootScope.mapVisibility = false;
        };

        tc.setTab = function(tab){
            tc.selectedTab = tab;
        }
        
        tc.expandTree = function () {
            $scope.tree.visit(function (node) {
                node.setExpanded(true);
            });
        };
        tc.collapseTree = function () {
            $scope.tree.visit(function (node) {
                node.setExpanded(false);
            });
        };
        tc.deselectAll = function () {
            $scope.tree.visit(function (node) {
                node.setSelected(false);
            });
        };
        tc.hideMenu = function () {
            $scope.$parent.menuIsHidden = true;
        }
        tc.help = function () {
            alert(" Em Desenvolvimento... ");
        }
        init();

        function init() {
            $rootScope.mapVisibility = true;
        }
    }
})();