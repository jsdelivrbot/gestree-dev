(function () {
    'use strict';

    angular
        .module('BaseDocumentalModule')
        .directive('categoryList', CategoryList);

    function CategoryList() {
        var directive = {
            bindToController: true,
            controller: CategoryController,
            controllerAs: 'catCtrl',
            restrict: 'E',
            scope: {},
            templateUrl: 'app/templates/category.html'
        };
        return directive;
    }

    CategoryController.$inject = ['BaseDocumentalService'];
    /* @ngInject */
    function CategoryController(BaseDocumentalService) {
        var catCtrl = this;
        activate();

        catCtrl.setActive = function (index) {
            if (catCtrl.active == index) {
                catCtrl.isActive = !catCtrl.isActive;
            } else {
                catCtrl.isActive = true;
            }
            catCtrl.active = index;
            catCtrl.subIndex = -1;
        }

        function activate() {
            catCtrl.isActive = false;
            catCtrl.baseAddress = BaseDocumentalService.getBaseAddress();
            catCtrl.items = BaseDocumentalService.getData();
        }
    }
})();