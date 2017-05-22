(function () {
    'use strict';

    angular
        .module('LegendsModule')
        .service('LegendsService', LegendsService);

    function LegendsService() {
        this.groups = [];
        this.addLayerLegend = function (layer) {
            var index = _findIndex(this.groups, layer.parent);
            if (index > -1) {
                if (_findIndex(this.groups[index].data, layer) == -1) {
                    this.groups[index].data.push({
                        title: layer.title,
                        workspace: layer.data.workspace,
                        name: layer.data.name
                    });
                }
            } else {
                this.groups.push({
                    title: layer.parent.title,
                    data: []
                });
                this.groups[this.groups.length - 1].data.push({
                    title: layer.title,
                    workspace: layer.data.workspace,
                    name: layer.data.name
                });
            }
        }.bind(this);

        this.removeLayerLegend = function (layer) {
            var index = _findIndex(this.groups, layer.parent);
            var lIndex = _findIndex(this.groups[index].data, layer);
            _removeAt(this.groups[index].data, lIndex);
            if (this.groups[index].data.length == 0) {
                _removeAt(this.groups, index);
            }
        }.bind(this);

        function _findIndex(array, data) {
            return array.findIndex(function (e) {
                return e.title == this.title;
            }, data);
        }

        function _removeAt(a, i) {
            a.splice(i, 1);
        }
    }

})();