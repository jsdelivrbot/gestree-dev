angular
  .module('unicerApp')
  .service('WFSStyles', WFSStyles);

function WFSStyles() {

  var _styles = {
    defaultStyle: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({
          color: [24, 72, 26, 0.8]
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
        fill: new ol.style.Fill({
          color: [72, 15, 15, 1]
        }),
        stroke: new ol.style.Stroke({
          color: [0, 0, 0, 1],
          width: 2
        })
      }),
      zIndex: 50
    })
  };

  return {
    treeSelected: treeSelected,
    treeDefault: treeDefault,
    treeIntervention: treeIntervention,
    treeHighlight: treeHighlight
  }

  function treeSelected(){
    return _styles.selected;
  }
  function treeDefault() {
    return _styles.defaultStyle;
  }
  function treeIntervention(feature, layer) {
    return feature.getProperties().has_inter ? _styles.intervention : _styles.defaultStyle;
  }
  function treeHighlight(selectedFeatureID) {
    return function (feature, layer) {
      return selectedFeatureID === feature.getId() ? _styles.selected : _styles.defaultStyle;
    }
  }

}