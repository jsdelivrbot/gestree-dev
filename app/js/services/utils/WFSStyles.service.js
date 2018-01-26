angular
  .module('unicerApp')
  .service('WFSStyles', WFSStyles);

function WFSStyles() {

  var _styles = {
    treeDefault: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({
          color: [15, 115, 15, 1]
        }),
        stroke: new ol.style.Stroke({
          color: [0, 0, 0, 1]
        }),
      })
    }),
    selected: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 4,
        fill: new ol.style.Fill({
          color: [72, 24, 70, 1]
        }),
        stroke: new ol.style.Stroke({
          color: [0, 0, 0, 1],
          width: 2
        }),
      }),
      zIndex: 100
    }),
    intervention: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 4,
        stroke: new ol.style.Stroke({
          color: [70, 15, 15, 1],
          width: 2
        })
      }),
      zIndex: 50
    }),
    noIntervention: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({
          color: [15, 115, 15, 0.7]
        }),
        stroke: new ol.style.Stroke({
          color: [0, 0, 0, 1]
        }),
      })
    })
  };

  return {
    treeSelected: treeSelected,
    treeDefault: treeDefault,
    treeIntervention: treeIntervention,
    treeHighlight: treeHighlight
  }

  function treeSelected(feature, res) {
    var style = _styles.selected;
    if (res < 0.6) {
      addLabel.call(style, feature.getId().toString());
    }else{
      style.setText(null);
    }
    return style;
  }
  function treeDefault(feature, res) {
    var style = _styles.treeDefault;
    if (res < 0.6) {
      addLabel.call(style, feature.getId().toString());
    }else{
      style.setText(null);
    }
    return style;
  }
  function treeIntervention(feature, res) {
    return feature.getProperties().has_inter ? _styles.intervention : _styles.noIntervention;
  }
  function treeHighlight(selectedFeatureID) {
    return function (feature, layer) {
      return selectedFeatureID === feature.getId() ? _styles.selected : _styles.defaultStyle;
    }
  }

  function addLabel(label) {
    this.setText(new ol.style.Text({
      text: label,
      offsetX: 10,
      offsetY: -7,
      scale: 1,
      stroke: new ol.style.Stroke({
        color: [0, 0, 0, 1]
      }),
      fill: new ol.style.Fill({
        color: [0, 0, 0, 1]
      })
    }))
  }

}