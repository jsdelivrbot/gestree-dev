(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .service('FilterService', FilterService);

    function FilterService() {
        var filterData = {};
        this.setFilter = _setFilter;
        this.getFilter = _getFilter;

        function _setFilter(filter) {
            filterData = filter;
        }

        function _getFilter() {
            return filterData;
        }
    }
})();