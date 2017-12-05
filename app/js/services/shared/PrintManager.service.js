angular
  .module('unicerApp')
  .service('PrintManager', PrintManager);

PrintManager.$inject = [
  '$q',
  'ParksHttp',
  'PrintHttp',
  'TreesHttp',
  'InterventionsHttp',
  'DefaultInterventionData',
];

function PrintManager($q, ParksHttp, PrintHttp, TreesHttp, InterventionsHttp, Defaults) {

  return {
    getPrintDefaults: getPrintDefaults,
    getCSVLinks: getCSVLinks,
    getPDFLinks: getPDFLinks
  };

  function getPrintDefaults() {
    return ParksHttp.getParks().then(function (parks) {
      return {
        parks: parks,
        seasons: Defaults.getSeasons(),
        years: Defaults.getYears(),
        contentTypes: [
          {
            key: 'trees',
            value: "Árvores"
          },
          {
            key: 'interventions',
            value: "Intervenções"
          }],
        formats: [
          {
            key: 'csv',
            value: ".csv (Comma Separated Values)"
          }, {
            key: "pdf",
            value: ".pdf (Printable Document Format)"
          }]
      }
    });
  }
  function getCSVLinks(params) {
    var deferred = $q.defer();
    var data = {
      url: 'print/csv/' + params.contentType.key,
      name: params.contentType.value + '.csv',
      params: {
        park: params.park.properties.nome 
      },
      icon: 'fa-file-excel-o'
    };
    if (params.season) data.params.season = params.season;
    if (params.year) data.params.year = params.year;
    deferred.resolve(data);
    return deferred.promise;
  }
  function getPDFLinks(params) {
    var requestData = _getDefaultRequestData();

    requestData.params = params;

    requestData.attributes.map.center = ol.proj.toLonLat(params.park.geometry.coordinates);
    requestData.attributes.parque = params.park.properties.nome;
    requestData.attributes.map.scale = params.park.properties.scale;
    requestData.attributes.map.layers[0].layers = params.park.properties.layers_to_print;

    if (params.contentType.key === "trees") {
      requestData.layout = "arvores";
      requestData.outputFilename = "Árvores - " + params.park.properties.nome;
      requestData.attributes.subtitle = "Impressão de Árvores";
      return _getTreeLink(requestData).then(function (downloadURL) {
        return {
          name: 'Árvores - ' + params.park.properties.nome + '.pdf',
          url: downloadURL,
          icon: 'fa-file-pdf-o'
        }
      });
    } else {
      requestData.layout = "inter";
      requestData.outputFilename = "Intervenções - " + params.park.properties.nome;
      requestData.attributes.subtitle = "Impressão de Intervenções";
      requestData.attributes.map.layers[0].styles = ["", "", "", "treeIntervention"];
      return _getInterventionsLink(requestData).then(function (downloadURL) {
        return {
          name: 'Intervenções  - ' + params.park.properties.nome +'.pdf',
          url: downloadURL,
          icon: 'fa-file-pdf-o'
        }
      })
    }
  }

  function _getDefaultRequestData() {
    return {
      outputFormat: "pdf",
      attributes: {
        title: "Gestree - Gestão",
        map: {
          longitudeFirst: true,
          scale: 6000,
          projection: "EPSG:4326",
          dpi: 254,
          height: 550,
          width: 500,
          rotation: 0,
          layers: [
            {
              type: "WMS",
              baseURL: "http://localhost/geoserver/wms",
              layers: [],
              serverType: "geoserver"
            }
          ]
        },
        datasource: []
      }
    }
  }
  function _getTreeLink(requestData) {
    return TreesHttp.getTrees(requestData.attributes.parque)
      .then(_getTreeTable)
      .then(function (datasource) {
        requestData.attributes.datasource.push({ title: "Árvores" });
        requestData.attributes.datasource[0].table = datasource;
        return requestData;
      }).then(function (requestData) {
        return PrintHttp.printTrees(requestData);
      });
  }
  function _getTreeTable(trees) {
    var columns = [], data = [];
    var genericTree = trees[0];
    for (var attr in genericTree) {
      columns.push(attr);
    };
    for (var i = 0; i < trees.length; i++) {
      var treeData = [];
      for (var treeAttr in trees[i]) {
        treeData.splice(
          columns.findIndex(function (el) {
            return el === treeAttr;
          }), 0, trees[i][treeAttr]);
      }
      data.push(treeData);
    }
    return {
      columns: columns,
      data: data
    };
  }
  function _getInterventionsLink(requestData) {
    var filter = {};
    filter.parque = requestData.attributes.parque;
    if (requestData.params.hasOwnProperty('season')) {
      filter.season = requestData.params.season;
    }
    if (requestData.params.hasOwnProperty('year')) {
      filter.year = requestData.params.year;
    }
    return InterventionsHttp.getFilteredInterventions(filter)
      .then(_getInterventionsTable)
      .then(function (datasource) {
        requestData.attributes.datasource = datasource;
        return requestData;
      })
      .then(function (requestData) {
        return PrintHttp.printInterventions(requestData);
      });
  }
  function _getInterventionsTable(interventions) {
    var columns = [];
    var datasource = [];
    var genericIntervention = interventions[0];
    for (var attr in genericIntervention) {
      columns.push(attr);
    }
    for (var i = 0; i < interventions.length; i++) {
      var interventionsData = [];
      var id_tree = interventions[i].id_tree;
      var hasTree = datasource.findIndex(function (el) {
        return el.id_tree === id_tree;
      })
      for (var interventionsAttr in interventions[i]) {
        interventionsData.splice(
          columns.findIndex(function (el) {
            return el === interventionsAttr;
          }), 0, interventions[i][interventionsAttr]);
      };
      if (hasTree === -1) {
        datasource.push({
          id_tree: id_tree,
          table: {
            columns: columns,
            data: [interventionsData]
          }
        });
      } else {
        datasource[hasTree].table.data.push(interventionsData);
      }
    }
    return datasource;
  }
}  