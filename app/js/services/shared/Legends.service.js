angular
  .module('unicerApp')
  .service('LegendsService', LegendsService);

function LegendsService() {
  var legends = [
    {
      title: "Parque de Pedras Salgadas",
      legendas: []
    },
    {
      title: "Vidago Palace",
      legendas: []
    }
  ];

  return {
    getLegends: getLegends,
    addLegend: addLegend,
    removeLegend: removeLegend
  }

  function addLegend(layer) {
    var style = layer.data.style || '';
    var parent = layer.parent;
    var grandParent = parent.parent;
    var parkIndex = _findParkIndex(legends, grandParent);
    var groupIndex = _findGroupIndex(legends[parkIndex].legendas, parent);
    if (groupIndex > -1) {
      var layerIndex = _findIndex(legends[parkIndex].legendas[groupIndex].data, layer);
      if (layerIndex == -1) {
        legends[parkIndex].legendas[groupIndex].data.push({
          _key: layer.data.key,
          title: layer.title,
          url: 'http://gistree.espigueiro.pt/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layer.data.workspace + ':' + layer.data.name + '&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style=' + style
        });
      } else {
        legends[parkIndex].legendas[groupIndex].data[layerIndex] = {
          _key: layer.data.key,
          title: layer.title,
          url: 'http://gistree.espigueiro.pt/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layer.data.workspace + ':' + layer.data.name + '&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style=' + style
        }
      }
    } else {
      legends[parkIndex].legendas.push({
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
    var parkIndex = _findParkIndex(legends, layer.parent.parent);
    var groupIndex = _findGroupIndex(legends[parkIndex].legendas, layer.parent);
    if (groupIndex > -1) {
      var lIndex = _findIndex(legends[parkIndex].legendas[groupIndex].data, layer);
      if (lIndex > -1) {
        _removeAt(legends[parkIndex].legendas[groupIndex].data, lIndex);
        if (legends[parkIndex].legendas[groupIndex].data == 0) {
          _removeAt(legends[parkIndex].legendas, groupIndex);
        }
      }
    }
  }

  function _findParkIndex(array, data) {
    return array.findIndex(function (e) {
      return e.title == this.title;
    }, data);
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
