(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .filter('dateFilter', Filter);

    Filter.$inject = ['$filter'];

    function Filter($filter) {
        return function (items, attr, from, to) {
            return $filter('filter')(items, function (v) {
                var date = moment(v[attr]);
                if (from || to) {
                    return date >= moment(from) && date <= moment(to);
                }else{
                    return true;
                }
            });
        };
    }
})();