angular
  .module('unicerApp')
  .directive('layersTab', LayersTab);

LayersTab.$inject = ['MapService', 'Layers', 'LegendsService', '$timeout'];

function LayersTab(MapService, Layers, Legends, $timeout) {
  var directive = {
    bindToController: true,
    controller: LayersTabController,
    controllerAs: 'layersCtrl',
    link: link,
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/navigation/tabs/Tab-Layers.html'
  };
  return directive;

  function link(scope, element, attrs) {
    var fancytreeOptions = {
      extensions: ["edit", "glyph", "wide"],
      checkbox: true,
      glyph: {
        map: {
          checkbox: "fa fa-toggle-off",
          checkboxSelected: "fa fa-toggle-on",
          checkboxUnknown: "fa fa-circle",
          doc: "fa fa-search",
          docOpen: "fa fa-search",
          error: "fa fa-exclamation-triangle",
          expanderClosed: "fa  fa-arrow-right",
          expanderLazy: "fa fa-arrow-right",
          expanderOpen: "fa fa-arrow-down",
          folder: "fa fa-folder",
          folderOpen: "fa fa-folder-open",
          loading: "fa fa-spinner"
        }
      },
      clickFolderMode: 2,
      selectMode: 3,
      source: {
        url: '/layers',
      },
      wide: {
        iconWidth: "1em",
        iconSpacing: "0.5em",
        levelOfs: "1.5em",
        labelSpacing: "0.5em"
      },
      select: _onSelect,
      init: _onInit,
      click: _onClick
    }
    var tree = element.find("#tree").fancytree(fancytreeOptions);
    scope.tree = tree.fancytree("getTree");
  }
  function _onInit(event, eventData) {
    var zoomLevel = MapService.getView().getZoom();
    if (zoomLevel === parseInt(zoomLevel, 10)) {
      eventData.tree.visit(function (node) {
        if (node.checkbox === false) {
          node.addClass("icon-padding");
        }
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
  }
  function _onSelect(event, eventData) {
    $timeout(function () {
      if (eventData.node.isFolder()) {
        var children = eventData.node.children;
        if (eventData.node.isSelected()) {
          children.forEach(function (layer) {
            layer.data.key = layer.data.key || layer.key;
            Layers.addLayer(layer.data);
            Legends.addLegend(layer);
          });
        } else {
          children.forEach(function (layer) {
            layer.data.key = layer.data.key || layer.key;
            Layers.removeLayer(layer.data)
            Legends.removeLegend(layer);
          });
        }
      } else {
        if (eventData.node.isSelected()) {
          eventData.node.data.key = eventData.node.data.key || eventData.node.key;
          Layers.addLayer(eventData.node.data);
          Legends.addLegend(eventData.node);
        } else {
          eventData.node.data.key = eventData.node.data.key || eventData.node.key;
          Legends.removeLegend(eventData.node);
          Layers.removeLayer(eventData.node.data)
        }
      }
    }, 1);
  }
  function _onClick(event, eventData) {
    if (eventData.targetType === 'icon' && !eventData.node.isFolder()) {
      var extent = ol.proj.transformExtent(eventData.node.data.extent, ol.proj.get('EPSG:27493'), 'EPSG:3857');
      MapService.getView().fit(extent, {
        duration: 1500
      });
    }
  }

  LayersTabController.$inject = ['$scope', 'Layers'];
  function LayersTabController($scope, Layers) {
    // Tree Controllers
    $scope.expandTree = expandTree
    $scope.collapseTree = collapseTree
    $scope.deselectAll = deselectAll
    function expandTree() {
      this.tree.visit(function (node) {
        node.setExpanded(true);
      });
    }
    function collapseTree() {
      this.tree.visit(function (node) {
        node.setExpanded(false);
      });
    }
    function deselectAll() {
      this.tree.visit(function (node) {
        node.setSelected(false);
      });
    }

    // Base Layer Controllers
    $scope.baseLayers = [
      {
        name: "Open Street Map",
        layerDef: new ol.layer.Tile({
          source: new ol.source.OSM({})
        })
      },
      {
        name: "Camada em Branco",
        layerDef: new ol.layer.Tile({})
      }]
    $scope.selectedBaseLayer = $scope.baseLayers[0]
    $scope.setBaseLayer = setBaseLayer
    function setBaseLayer(baseLayer) {
      $scope.selectedBaseLayer = baseLayer;
      Layers.setBaseLayer(baseLayer.layerDef);
    }
  }
}