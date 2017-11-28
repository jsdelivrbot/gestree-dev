angular
  .module('unicerApp')
  .run(function () {
    proj4.defs("EPSG:27493", "+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +towgs84=-223.237,110.193,36.649,0,0,0,0 +units=m +no_defs");
    var extent = [-127101.82, -300782.39, 160592.41, 278542.12];
    var projection = ol.proj.get('EPSG:27493');
    projection.setExtent(extent);
    ol.Collection.prototype.insertLayer = function (layer) {
      var index = this.getArray().findIndex(function (mapLayer) {
        return mapLayer.get('group') < layer.get('group');
      });
      if (index !== -1) {
        this.insertAt(index, layer);
      } else {
        this.push(layer);
      }
    };
    ol.layer.Base.prototype.isQueryable = function () {
      return this.get('queryable');
    };
  })