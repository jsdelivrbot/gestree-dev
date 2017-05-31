(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .service('FilterDataService', FilterDataService);

    function FilterDataService() {
        var filterData = {};
        var filterDate = {};
        this.setFilter = _setFilter;
        this.getFilter = _getFilter;
        this.getFilterDate = _getFilterDate;
        this.setFilterDate = _setFilterDate;
        
        function _setFilter(filter) {
            filterData = filter;
        }

        function _getFilter() {
            return filterData;
        }

        function _setFilterDate(filter) {
            filterDate = filter;
        }

        function _getFilterDate() {
            return filterDate;
        }
    }
})();