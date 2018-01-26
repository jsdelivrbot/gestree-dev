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
  var multiLegendsManager = {};

  return {
    getLegends: getLegends,
    addLegend: addLegend,
    addMultiLegend: addMultiLegend,
    removeLegend: removeLegend,
    removeMultiLegend: removeMultiLegend
  }


  function addMultiLegend(layer) {
    var legendID = layer.data.multiLegendID;
    if (multiLegendsManager[legendID] && multiLegendsManager[legendID].length !== 0) {
      if (multiLegendsManager[legendID].indexOf(layer.data.key) === -1) {
        multiLegendsManager[legendID].push(layer.data.key);
      }
    } else {
      multiLegendsManager[legendID] = [];
      multiLegendsManager[legendID].push(layer.data.key);
      addLegend(layer);
    }
  }
  function removeMultiLegend(layer) {
    var legendID = layer.data.multiLegendID;
    var index = multiLegendsManager[legendID].indexOf(layer.data.key);
    multiLegendsManager[legendID].splice(index, 1);
    if (multiLegendsManager[legendID].length === 0) {
      removeLegend(layer);
    }
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
          _key: layer.data.multiLegendID || layer.data.key,
          title: layer.title,
          url: 'http://gistree.espigueiro.pt/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layer.data.workspace + ':' + layer.data.name + '&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style=' + style
        });
      } else {
        legends[parkIndex].legendas[groupIndex].data[layerIndex] = {
          _key: layer.data.multiLegendID || layer.data.key,
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
      if (this.data.multiLegendID) {
        return e._key == this.data.multiLegendID;
      } else {
        return e._key == this.data.key;
      }
    }, data);
  }
  function _removeAt(a, i) {
    a.splice(i, 1);
  }
}
