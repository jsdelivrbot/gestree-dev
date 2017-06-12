(function () {
    'use strict';

    angular
        .module('LegendsModule')
        .service('LegendsService', LegendsService);

    LegendsService.$inject = ['Globals'];

    function LegendsService(Globals) {
        this.groups = [];
        this.addLayerLegend = function (layer) {
            console.log("Adding Legend!");
            var style = layer.data.style || '';
            var index = _findGroupIndex(this.groups, layer.parent);
            console.log("Group Index", index);
            if (index > -1) {
                var layerIndex = _findIndex(this.groups[index].data, layer);
                console.log("Layer Index", layerIndex);
                if (layerIndex == -1) {
                    this.groups[index].data.push({
                        _key: layer.data.key,
                        title: layer.title,
                        url: Globals.URL_WMS[Globals.ENVIRONMENT] + "?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + layer.data.workspace + ":" + layer.data.name + "&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style=" + style
                    });
                } else {
                    this.groups[index].data[layerIndex] = {
                        _key: layer.data.key,
                        title: layer.title,
                        url: Globals.URL_WMS[Globals.ENVIRONMENT] + "?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + layer.data.workspace + ":" + layer.data.name + "&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style=" + style
                    }
                }
            } else {
                this.groups.push({
                    title: layer.parent.title,
                    data: []
                });
                this.addLayerLegend(layer);
            }
        }

        this.removeLayerLegend = function (layer) {
            var index = _findGroupIndex(this.groups, layer.parent);
            var lIndex = _findIndex(this.groups[index].data, layer);
            _removeAt(this.groups[index].data, lIndex);
            if (this.groups[index].data.length == 0) {
                _removeAt(this.groups, index);
            }
        }

        function _findGroupIndex(array, data) {
            return array.findIndex(function (e) {
                return e.title == this.title;
            }, data);
        }

        function _findIndex(array, data) {
            return array.findIndex(function (e) {
                console.log("Element Key", e._key, "Data Key", this.data.key);
                return e._key == this.data.key;
            }, data);
        }

        function _removeAt(a, i) {
            a.splice(i, 1);
        }
    }

})();