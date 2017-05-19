(function () {
    'use strict';
    angular
        .module('MapModule')
        .factory('LayersFactory', LayersFactory);

    function LayersFactory() {
        function setLayerOrder(l) {
            var groupIndex = 0;
            l.forEach(function (group) {
                groupIndex++;
                group.children.forEach(function (layer) {
                    layer.data.group = groupIndex;
                });
            });
            return l;
        };

        function addLayer(grp) {
            $('#tree').fancytree("getTree").visit(function (node) {
                if (node.isFolder() && node.title == grp.title) {
                    grp.children.forEach(function (layer) {
                        layer.extraClasses = "protected";
                        node.addChildren(layer, 0);
                    });
                }
            });
        }

        function removeProtectedLayers() {
            var remove = [];
            $('#tree').fancytree("getTree").visit(function (node) {
                if (!node.isFolder() && node.data.protected) {
                    remove.push(node.key);
                }
            });
            for (var i = 0; i < remove.length; i++) {
                var node = $('#tree').fancytree("getTree").getNodeByKey(remove[i]);
                node.remove();
            }
        }

        return {
            glyph_opts: {
                map: {
                    checkbox: "fa fa-toggle-off",
                    checkboxSelected: "fa fa-toggle-on",
                    checkboxUnknown: "fa fa-circle",
                    doc: "fa fa-search",
                    docOpen: "fa fa-search",
                    error: "fa fa-exclamation-triangle",
                    expanderClosed: "fa  fa-arrow-right",
                    expanderLazy: "fa fa-arrow-right", // glyphicon-plus-sign
                    expanderOpen: "fa fa-arrow-down", // glyphicon-collapse-down
                    folder: "fa fa-folder",
                    folderOpen: "fa fa-folder-open",
                    loading: "fa fa-spinner"
                }
            },
            addLayer: addLayer,
            removeProtectedLayers: removeProtectedLayers
        }
    };
})();