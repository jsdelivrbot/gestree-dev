(function () {
    'use strict';

    angular
        .module('BaseDocumentalModule')
        .directive('subcategoryList', subcategoryList);

    function subcategoryList() {
        var directive = {
            bindToController: true,
            controller: SubCategoryController,
            controllerAs: 'subCatCtrl',
            restrict: 'E',
            scope: {
                subcategory: "=",
                baseAddress: "=",
                active: "=index"
            },
            templateUrl: 'app/templates/subcategory.html'
        };
        return directive;
    }
    /* @ngInject */
    function SubCategoryController() {
        var subCatCtrl = this;
        subCatCtrl.setActive = function (index) {
            subCatCtrl.active = index;
        }
    }
})();