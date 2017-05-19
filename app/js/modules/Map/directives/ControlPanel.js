(function () {
    'use strict';
    angular
        .module('MapModule')
        .directive('controlPanel', Directive);

    Directive.$inject = ['LayersFactory', 'MapService', 'LegendsService', '$timeout'];

    function Directive(LayersFactory, MapService, LegendsService, $timeout) {
        var directive = {
            bindToController: true,
            controller: 'TabsController',
            controllerAs: 'tc',
            link: link,
            restrict: 'E',
            scope: {
                menuIsHidden: "="
            },
            templateUrl: 'app/views/templates/tabs.html'
        };
        return directive;

        function link(scope, element, attrs) {
            var tree = element.find("#tree").fancytree({
                extensions: ["edit", "glyph", "wide"],
                checkbox: true,
                glyph: LayersFactory.glyph_opts,
                clickFolderMode: 4,
                selectMode: 3,
                source: {
                    url: '/api/layers',                    
                },
                toggleEffect: {
                    effect: "drop",
                    options: {
                        direction: "left"
                    },
                    duration: 200
                },
                wide: {
                    iconWidth: "1em",
                    iconSpacing: "0.5em",
                    levelOfs: "1.5em"
                },
                select: function (event, data) {
                    $timeout(function () {
                        if (data.node.isFolder()) {
                            var children = data.node.children;
                            if (data.node.isSelected()) {
                                children.forEach(function (el) {
                                    el.data.key = el.key;
                                    MapService.addLayer(el.data);
                                    LegendsService.addLayerLegend(el);
                                });
                            } else {
                                children.forEach(function (el) {
                                    el.data.key = el.key;
                                    MapService.removeLayer(el.data);
                                    LegendsService.removeLayerLegend(el);
                                });
                            }
                        } else {
                            if (data.node.isSelected()) {
                                data.node.data.key = data.node.key;
                                MapService.addLayer(data.node.data);
                                LegendsService.addLayerLegend(data.node);
                            } else {
                                data.node.data.key = data.node.key;
                                MapService.removeLayer(data.node.data);
                                LegendsService.removeLayerLegend(data.node);
                            }
                        }
                    }, 1);
                },
                init: function (event, data) {
                    var zoomLevel = MapService.map.getView().getZoom();
                    if (zoomLevel === parseInt(zoomLevel, 10)) {
                        data.tree.visit(function (node) {
                            if (node.data.preselected) {
                                node.setSelected(true);
                            }
                            var minZoom = node.data.minZoom,
                                maxZoom = node.data.maxZoom;
                            if (!node.isFolder()) {
                                if (minZoom != undefined) {
                                    if (minZoom < zoomLevel) {
                                        node.removeClass("layer-hidden");
                                    } else {
                                        node.addClass("layer-hidden");
                                    }
                                }
                            }
                        });
                    }
                },
                click: function (event, data) {
                    if (data.targetType === 'icon' && !data.node.isFolder()) {
                        var extent = ol.proj.transformExtent(data.node.data.extent, ol.proj.get('EPSG:27493'), 'EPSG:3857');
                        MapService.map.getView().fit(extent, {
                            duration: 1500
                        });
                    }
                }
            });
            scope.tree = element.find("#tree").fancytree('getTree');
        }
    }
})();