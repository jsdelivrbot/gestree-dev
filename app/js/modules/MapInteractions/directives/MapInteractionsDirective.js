(function () {
    'use strict';

    angular
        .module('MapInteractionsModule')
        .directive('mapInteractions', MapInteractionsDirective);

    MapInteractionsDirective.$inject = ['MapService'];

    function MapInteractionsDirective(MapService) {
        var directive = {
            bindToController: true,
            controller: 'MapInteractionsController',
            controllerAs: 'itCtrl',
            link: link,
            restrict: 'E',
            scope: {
                menuIsHidden: "="
            },
            templateUrl: 'app/templates/MapInteractionsTemplate.html'
        };
        return directive;

        function link(scope, element, attrs) {
            MapService.map.addControl(new ol.control.MousePosition({
                coordinateFormat: function (coord) {
                    return ol.coordinate.format(coord, " {x} , {y} ", 4);
                },
                projection: 'EPSG:4326',
                className: '',
                target: document.getElementById('coordinate4326'),
                undefinedHTML: '&nbsp;'
            }));
            MapService.map.addControl(new ol.control.MousePosition({
                coordinateFormat: function (coord) {
                    return ol.coordinate.format(coord, " {x} , {y} ", 4);
                },
                projection: ol.proj.get('EPSG:27493'),
                className: '',
                target: document.getElementById('coordinate27493'),
                undefinedHTML: '&nbsp;'
            }));
        }
    }
})();