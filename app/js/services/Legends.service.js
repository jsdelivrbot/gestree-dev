angular
  .module('unicerApp')
  .service('LegendsService', LegendsService);

function LegendsService() {
  var legends = [];

  return {
    getLegends: getLegends,
    addLegend: addLegend,
    removeLegend: removeLegend
  }

  function addLegend(layer) {
    var style = layer.data.style || '';
    var index = _findGroupIndex(legends, layer.parent);
    if (index > -1) {
      var layerIndex = _findIndex(legends[index].data, layer);
      if (layerIndex == -1) {
        legends[index].data.push({
          _key: layer.data.key,
          title: layer.title,
          url: 'http://gistree.espigueiro.pt/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layer.data.workspace + ':' + layer.data.name + '&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style=' + style
        });
      } else {
        legends[index].data[layerIndex] = {
          _key: layer.data.key,
          title: layer.title,
          url: 'http://gistree.espigueiro.pt/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layer.data.workspace + ':' + layer.data.name + '&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style=' + style
        }
      }
    } else {
      legends.push({
        title: layer.parent.title,
        data: []
      });
      addLegend(layer);
    }
  }
  function getLegends() {
    return legends;
  }
  function removeLegend(layer) {
    var index = _findGroupIndex(legends, layer.parent);
    var lIndex = _findIndex(legends[index].data, layer);
    _removeAt(legends[index].data, lIndex);
    if (legends[index].data.length == 0) {
      _removeAt(legends, index);
    }
  }

  function _findGroupIndex(array, data) {
    return array.findIndex(function (e) {
      return e.title == this.title;
    }, data);
  }
  function _findIndex(array, data) {
    return array.findIndex(function (e) {
      return e._key == this.data.key;
    }, data);
  }
  function _removeAt(a, i) {
    a.splice(i, 1);
  }
}
