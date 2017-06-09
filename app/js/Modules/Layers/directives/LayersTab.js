(function () {
    'use strict';

    angular
        .module('LayersModule')
        .directive('layersTab', LayersTab);

    LayersTab.$inject = ['Map', 'LayersFactory', 'LegendsService', 'StylesFactory', '$timeout'];

    function LayersTab(Map, Layers, Legends, StylesFactory, $timeout) {
        var directive = {
            bindToController: true,
            controller: 'LayersController',
            controllerAs: 'layersCtrl',
            link: link,
            restrict: 'E',
            scope: {},
            templateUrl: 'views/templates/control-panel/layersTab.html'
        };
        return directive;

        function link(scope, element, attrs) {
            var styles = new StylesFactory();
            var tree = element.find("#tree").fancytree({
                extensions: ["edit", "glyph", "wide"],
                checkbox: true,
                glyph: Layers.glyph_opts,
                clickFolderMode: 4,
                selectMode: 3,
                source: {
                    url: Layers.url,
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
                    levelOfs: "1.5em",
                    labelSpacing: "0.5em"
                },
                select: function (event, data) {
                    $timeout(function () {
                        if (data.node.isFolder()) {
                            var children = data.node.children;
                            if (data.node.isSelected()) {
                                children.forEach(function (el) {
                                    el.data.key = el.key;
                                    Map.addLayer(el.data, styles[el.style]);
                                    Legends.addLayerLegend(el);
                                });
                            } else {
                                children.forEach(function (el) {
                                    el.data.key = el.key;
                                    Map.removeLayer(el.data);
                                    Legends.removeLayerLegend(el);
                                });
                            }
                        } else {
                            if (data.node.isSelected()) {
                                data.node.data.key = data.node.key;
                                Map.addLayer(data.node.data, styles[data.node.data.style]);
                                Legends.addLayerLegend(data.node);
                            } else {
                                data.node.data.key = data.node.key;
                                Map.removeLayer(data.node.data);
                                Legends.removeLayerLegend(data.node);
                            }
                        }
                    }, 1);
                },
                init: function (event, data) {
                    var zoomLevel = Map.map.getView().getZoom();
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
                        Map.map.getView().fit(extent, {
                            duration: 1500
                        });
                    }
                }
            });
            scope.tree = element.find("#tree").fancytree('getTree');
        }
    }
})();