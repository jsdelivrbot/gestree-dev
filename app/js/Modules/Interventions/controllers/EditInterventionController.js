(function () {
    'use strict';

    angular
        .module('InterventionsModule')
        .controller('EditInterventionController', EditInterventionController);

    EditInterventionController.$inject = ['Minimap', 'StylesFactory', 'interTypes', 'intervention', 'InterventionsService', '$scope', '$timeout'];

    function EditInterventionController(Minimap, StylesFactory, interTypes, intervention, InterventionsService, $scope, $timeout) {
        var editCtrl = this;
        var _tree = intervention.tree;
        var _coordinates = [_tree.geom.coordinates[0][0], _tree.geom.coordinates[0][1]];
        var style = new StylesFactory();
        var mapResize;
        editCtrl.inter = intervention;
        editCtrl.interTypes = interTypes;


        editCtrl.setInterType = function (type) {
            editCtrl.inter.id_type = type;
        }

        editCtrl.save = function () {
            editCtrl.error = '';
            InterventionsService.updateIntervention(editCtrl.inter)
                .then(function (data) {
                    editCtrl.message = "A intervenção foi alterada com sucesso.";
                }).catch(function (err) {
                    editCtrl.error = "Ocorreu um erro ao tentar alterar a intervenção";
                });
        }

        $scope.$on('$destroy', function () {
            $timeout.cancel(mapResize);
        });

        activate();

        function activate() {
            Minimap.setTarget("minimap");
            Minimap.setCenterAndZoom(_coordinates, 21, 'EPSG:27493');
            var _layer = Minimap.addLayer({
                "workspace": "unicer",
                "name": "arvores",
                "type": "WFS",
                "extent": [43858.7242812507, 208452.333204688, 44110.6809999999, 209084.351648437],
                "opacity": 1
            });
            _layer.setStyle(function (feature) {
                return feature.id_ == _tree.gid ? style.treeHighlight() : style.treeDefault();
            });
            mapResize = $timeout(function () {
                Minimap.updateSize();
            }, 100);
        }
    }
})();