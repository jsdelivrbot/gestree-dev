!function(){"use strict";angular.module("unicerApp",["MainModule"]).config(["$mdThemingProvider",function(e){e.definePalette("whiteGreen",{50:"5cb85c",100:"000000",200:"5cb85c",300:"5cb85c",400:"5cb85c",500:"5cb85c",600:"5cb85c",700:"5cb85c",800:"5cb85c",900:"5cb85c",A100:"ffffff",A200:"000000",A400:"000000",A700:"000000",contrastDefaultColor:"light",contrastDarkColors:["50","100","200","300","400","A100"],contrastLightColors:void 0}),e.theme("default").primaryPalette("green").backgroundPalette("whiteGreen")}])}(),function(){"use strict";angular.module("unicerApp.configs",[]).constant("Globals",{ENVIRONMENT:"Development",URL_WMS:{Development:"http://localhost:3000/geoserver/wms",Production:"http://gistree.espigueiro.pt:3001/geoserver"},URL_WFS:{Development:"http://localhost:3000/geoserver/wfs",Production:"http://gistree.espigueiro.pt:3001/geoserver"},URL_PRINT:{Development:"http://localhost:3000/geoserver/pdf",Production:"http://gistree.espigueiro.pt:3001/geoserver"}})}(),function(){"use strict";angular.module("ControlPanelModule",["LayersModule","LegendsModule","InterventionsModule","PrintModule"])}(),function(){"use strict";angular.module("LayersModule",[]).run(["ControlPanelService",function(e){e.addTab({id:1,name:"Camadas",tooltip:"Camadas",iconClass:"my-icon-camadas",location:"/"})}])}(),function(){"use strict";angular.module("InterventionsModule",["ngRoute","MapModule"]).config(["$mdDateLocaleProvider",function(e){e.months=["janeiro","fevereiro","março","abril","maio","junho","agosto","setembro","outubro","novembro","dezembro"],e.shortMonths=["jan","feb","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],e.days=["domingo","segunda","terça","quarta","quinta","sexta","sabado"],e.shortDays=["Do","Se","Te","Qa","Qi","Se","Sa"],e.firstDayOfWeek=1,e.parseDate=function(e){var t=moment(e,"DD/MM/YYYY",!0);return t.isValid()?t.toDate():new Date(NaN)},e.formatDate=function(e){return e?moment(e).format("DD/MM/YYYY"):""},e.weekNumberFormatter=function(e){return"Semana "+e},e.msgCalendar="Calendário",e.msgOpenCalendar="Abrir o calendário",e.firstRenderableDate=new Date(2e3,1,1),e.lastRenderableDate=new Date(2100,12,31)}]).run(["ControlPanelService",function(e){e.addTab({id:3,name:"Intervenções",tooltip:"Intervenções",iconClass:"my-icon-tree",location:"/interv"})}])}(),function(){"use strict";function e(e){return e.getAllInterventions()}function t(e,t){return t.getIntervention(e.current.params.int_id)}function n(e){return e.get()}angular.module("MainModule",["ngMaterial","ngMessages","ngRoute","ControlPanelModule"]).config(["$routeProvider","$locationProvider",function(o,r){o.when("/",{templateUrl:"views/templates/main.html",controller:["Map","$scope","$timeout",function(e,t,n){e.setTarget("map"),t.$watch("cPanelVisibility",function(){n(function(){e.updateSize()},50)})}]}).when("/interv",{templateUrl:"views/templates/interventions/interventionsList.html",controller:"InterventionsListController",controllerAs:"intListCtrl",resolve:{Interventions:["InterventionsService",e]}}).when("/interv/:int_id/edit",{templateUrl:"views/templates/interventions/edit.html",controller:"EditInterventionController",controllerAs:"editCtrl",resolve:{intervention:["$route","InterventionsService",t],interTypes:["InterventionTypesFactory",n]}}).when("/interv/:int_id/close",{templateUrl:"views/templates/interventions/close.html",controller:"CloseInterventionController",controllerAs:"closeCtrl",resolve:{intervention:["$route","InterventionsService",t]}}).when("/interv/:int_id/info",{templateUrl:"views/templates/interventions/info.html",controller:"MoreInfoContoller",controllerAs:"moreInfoCtrl",resolve:{intervention:["$route","InterventionsService",t]}}).otherwise({redirectTo:"/"}),r.html5Mode(!0)}]).run(["Map",function(e){e.setTarget("map")}])}(),function(){"use strict";angular.module("LegendsModule",[]).run(["ControlPanelService",function(e){e.addTab({id:2,name:"Legendas",tooltip:"Legendas",iconClass:"my-icon-legends",location:"/"})}])}(),function(){"use strict";angular.module("MapModule",["unicerApp.configs","MapInteractionsModule"]).config(["MapProvider","Globals",function(e,t){e.setDefaultLayers([new ol.layer.Tile({source:new ol.source.OSM({}),queryable:!1}),new ol.layer.Image({opacity:1,source:new ol.source.ImageWMS({url:"http://localhost:3000/geoserver/wms",params:{LAYERS:"unicer:limite"},extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437]})}),new ol.layer.Tile({opacity:1,source:new ol.source.TileWMS({url:"http://localhost:3000/geoserver/wms",params:{LAYERS:"unicer:base"},extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437]})}),new ol.layer.Tile({opacity:1,source:new ol.source.TileWMS({url:"http://localhost:3000/geoserver/wms",params:{LAYERS:"unicer:edificios"},extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437]})})]),e.setInteractions([new ol.interaction.MouseWheelZoom,new ol.interaction.DragPan]),e.setControls([new ol.control.ScaleLine,new ol.control.OverviewMap({className:"ol-overviewmap ol-custom-overviewmap",layers:[new ol.layer.Image({source:new ol.source.ImageWMS({url:t.URL_WMS[t.ENVIRONMENT],params:{LAYERS:"unicer:limite"},extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437]})}),new ol.layer.Image({source:new ol.source.ImageWMS({url:t.URL_WMS[t.ENVIRONMENT],params:{LAYERS:"unicer:base"},extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437]})}),new ol.layer.Image({source:new ol.source.ImageWMS({url:t.URL_WMS[t.ENVIRONMENT],params:{LAYERS:"unicer:edificios"},extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437]})})],collapseLabel:"-",label:"+",collapsed:!0,tipLabel:""})]),e.setCenterAndZoom([-7.593569,41.595564],11)}]).config(["MinimapProvider","Globals",function(e,t){e.setDefaultLayers([new ol.layer.Tile({source:new ol.source.OSM({}),queryable:!1}),new ol.layer.Image({opacity:1,source:new ol.source.ImageWMS({url:t.URL_WMS[t.ENVIRONMENT],params:{LAYERS:"unicer:limite"},extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437]})}),new ol.layer.Tile({opacity:1,source:new ol.source.TileWMS({url:t.URL_WMS[t.ENVIRONMENT],params:{LAYERS:"unicer:base"},extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437]})}),new ol.layer.Tile({opacity:1,source:new ol.source.TileWMS({url:t.URL_WMS[t.ENVIRONMENT],params:{LAYERS:"unicer:edificios"},extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437]})})]),e.setInteractions([]),e.setControls([]),e.setCenterAndZoom([-7.593569,41.595564],11)}]).run(function(){proj4.defs("EPSG:27493","+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +towgs84=-223.237,110.193,36.649,0,0,0,0 +units=m +no_defs");var e=[-127101.82,-300782.39,160592.41,278542.12];ol.proj.get("EPSG:27493").setExtent(e),ol.Collection.prototype.insertLayer=function(e){var t=this.getArray().findIndex(function(t){return t.get("group")<e.get("group")});-1!==t?this.insertAt(t,e):this.push(e)},ol.layer.Base.prototype.isQueryable=function(){return this.get("queryable")}})}(),function(){"use strict";angular.module("MapInteractionsModule",["ui.select","ngSanitize"])}(),function(){"use strict";angular.module("PrintModule",[]).run(["ControlPanelService",function(e){e.addTab({id:4,name:"Imprimir",tooltip:"Imprimir",iconClass:"my-icon-imprimir",location:"/"})}])}(),function(){"use strict";function e(e,t){var n=this;n.hideControlPanel=function(){t.$emit("controlPanel:panelVisibility",!1)},n.setActiveTab=function(e,t){n.active=e},n.isActiveTab=function(e){return n.active===e},n.showControlPanel=function(){t.$emit("controlPanel:panelVisibility",!0)},function(){n.active=1,n.tabs=e.getTabs()}()}angular.module("ControlPanelModule").controller("ControlPanelController",e),e.$inject=["ControlPanelService","$scope"]}(),function(){"use strict";function e(){return{bindToController:!0,controller:"ControlPanelController",controllerAs:"cPanelCtrl",restrict:"E",templateUrl:"views/templates/control-panel/controlPanel.html"}}angular.module("ControlPanelModule").directive("controlPanel",e)}(),function(){"use strict";function e(){function e(e){n.push(e)}function t(){return n}var n=[];this.addTab=e,this.getTabs=t}angular.module("ControlPanelModule").service("ControlPanelService",e)}(),function(){"use strict";function e(e,t,n){var o=this;o.setBaseLayer=function(t){o.baseLayer=t.name,e.setBaseLayer(t.layerDef)},o.setTab=function(e){tc.selectedTab=e},o.expandTree=function(){t.tree.visit(function(e){e.setExpanded(!0)})},o.collapseTree=function(){t.tree.visit(function(e){e.setExpanded(!1)})},o.deselectAll=function(){t.tree.visit(function(e){e.setSelected(!1)})},o.help=function(){alert(" Em Desenvolvimento... ")},function(){o.baseLayers=[{name:"Open Street Map",layerDef:new ol.layer.Tile({source:new ol.source.OSM({})})},{name:"Camada em Branco",layerDef:new ol.layer.Tile({})}],o.baseLayer="Mapa de Base"}()}angular.module("LayersModule").controller("LayersController",e),e.$inject=["Map","$scope","$rootScope"]}(),function(){"use strict";function e(e,t,n,o,r){function i(i,a,l){var s=new o;a.find("#tree").fancytree({extensions:["edit","glyph","wide"],checkbox:!0,glyph:t.glyph_opts,clickFolderMode:4,selectMode:3,source:{url:t.url},toggleEffect:{effect:"drop",options:{direction:"left"},duration:200},wide:{iconWidth:"1em",iconSpacing:"0.5em",levelOfs:"1.5em",labelSpacing:"0.5em"},select:function(t,o){r(function(){if(o.node.isFolder()){var t=o.node.children;o.node.isSelected()?t.forEach(function(t){t.data.key=t.data.key||t.key,e.addLayer(t.data,s[t.style]),n.addLayerLegend(t)}):t.forEach(function(t){t.data.key=t.data.key||t.key,e.removeLayer(t.data),n.removeLayerLegend(t)})}else o.node.isSelected()?(o.node.data.key=o.node.data.key||o.node.key,e.addLayer(o.node.data,s[o.node.data.style]),n.addLayerLegend(o.node)):(o.node.data.key=o.node.data.key||o.node.key,e.removeLayer(o.node.data),n.removeLayerLegend(o.node))},1)},init:function(t,n){var o=e.map.getView().getZoom();o===parseInt(o,10)&&n.tree.visit(function(e){!1===e.checkbox&&e.addClass("icon-padding"),e.data.preselected&&e.setSelected(!0);var t=e.data.minZoom;e.data.maxZoom;e.isFolder()||void 0!=t&&(t<o?e.removeClass("layer-hidden"):e.addClass("layer-hidden"))})},click:function(t,n){if("icon"===n.targetType&&!n.node.isFolder()){var o=ol.proj.transformExtent(n.node.data.extent,ol.proj.get("EPSG:27493"),"EPSG:3857");e.map.getView().fit(o,{duration:1500})}}});i.tree=a.find("#tree").fancytree("getTree")}return{bindToController:!0,controller:"LayersController",controllerAs:"layersCtrl",link:i,restrict:"E",scope:{},templateUrl:"views/templates/control-panel/layersTab.html"}}angular.module("LayersModule").directive("layersTab",e),e.$inject=["Map","LayersFactory","LegendsService","StylesFactory","$timeout"]}(),function(){"use strict";function e(){function e(e){$("#tree").fancytree("getTree").visit(function(t){t.isFolder()&&t.title==e.title&&e.children.forEach(function(e){e.extraClasses="protected",t.addChildren(e,0)})})}function t(){var e=[];$("#tree").fancytree("getTree").visit(function(t){!t.isFolder()&&t.data.protected&&e.push(t.key)});for(var t=0;t<e.length;t++){$("#tree").fancytree("getTree").getNodeByKey(e[t]).remove()}}return{glyph_opts:{map:{checkbox:"fa fa-toggle-off",checkboxSelected:"fa fa-toggle-on",checkboxUnknown:"fa fa-circle",doc:"fa fa-search",docOpen:"fa fa-search",error:"fa fa-exclamation-triangle",expanderClosed:"fa  fa-arrow-right",expanderLazy:"fa fa-arrow-right",expanderOpen:"fa fa-arrow-down",folder:"fa fa-folder",folderOpen:"fa fa-folder-open",loading:"fa fa-spinner"}},addLayer:e,removeProtectedLayers:t,url:"/layers"}}angular.module("MapModule").factory("LayersFactory",e)}(),function(){"use strict";function e(e,t,n,o){var r=this;r.inter=o,r.close=function(o){r.error="",o.$invalid||(r.inter.state="FECHADA",n.closeIntervention(r.inter).then(function(n){r.message="A intervenção foi fechada com sucesso.",e(function(){t.path("/interv")},1e3)}).catch(function(e){r.error="Ocorreu um erro no fecho da intervenção."}))}}angular.module("InterventionsModule").controller("CloseInterventionController",e),e.$inject=["$timeout","$location","InterventionsService","intervention"]}(),function(){"use strict";function e(e,t,n,o,r,i,a){var l,s=this,c=o.tree,u=[c.geom.coordinates[0][0],c.geom.coordinates[0][1]],d=new t;s.inter=o,s.interTypes=n,s.setInterType=function(e){s.inter.id_type=e},s.save=function(){s.error="",r.updateIntervention(s.inter).then(function(e){s.message="A intervenção foi alterada com sucesso."}).catch(function(e){s.error="Ocorreu um erro ao tentar alterar a intervenção"})},i.$on("$destroy",function(){a.cancel(l)}),function(){e.setTarget("minimap"),e.setCenterAndZoom(u,21,"EPSG:27493"),e.addLayer({workspace:"unicer",name:"arvores",type:"WFS",extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437],opacity:1}).setStyle(function(e){return e.id_==c.gid?d.treeHighlight():d.treeDefault()}),l=a(function(){e.updateSize()},100)}()}angular.module("InterventionsModule").controller("EditInterventionController",e),e.$inject=["Minimap","StylesFactory","interTypes","intervention","InterventionsService","$scope","$timeout"]}(),function(){"use strict";function e(e,t){var n=this;n.edit=function(){t.path("/interv/"+n.intervention.id+"/edit")},n.info=function(){t.path("/interv/"+n.intervention.id+"/info")},n.close=function(){t.path("/interv/"+n.intervention.id+"/close")}}angular.module("InterventionsModule").controller("InterventionItemController",e),e.$inject=["$scope","$location"]}(),function(){"use strict";function e(e,t,n,o){function r(){e.interventions=n("filter")(e.allInterventions,i),e.interventions=n("dateFilter")(e.interventions,"created_at",a.createdAtStart,a.createdAtEnd),e.interventions=n("dateFilter")(e.interventions,"intervention_date",a.interventionStart,a.interventionEnd),e.interventions=n("dateFilter")(e.interventions,"finished_at",a.finishedAtStart,a.finishedAtEnd)}var i={},a={};e.$watch(function(){return t.getFilter()},function(e,t){i=e,r()},!0),e.$watch(function(){return t.getFilterDate()},function(e,t){a=e,r()},!0),function(){e.allInterventions=o,e.interventions=o,r()}()}angular.module("InterventionsModule").controller("InterventionsListController",e),e.$inject=["$scope","FilterDataService","$filter","Interventions"]}(),function(){"use strict";function e(e,t,n,o,r){this.inter=n;var i,a=n.tree,l=[a.geom.coordinates[0][0],a.geom.coordinates[0][1]],s=new t;o.$on("$destroy",function(){r.cancel(i)}),function(){e.setTarget("minimap"),e.setCenterAndZoom(l,21,"EPSG:27493"),e.addLayer({workspace:"unicer",name:"arvores",type:"WFS",extent:[43858.7242812507,208452.333204688,44110.6809999999,209084.351648437],opacity:1}).setStyle(function(e){return e.id_==a.gid?s.treeHighlight():s.treeDefault()}),i=r(function(){e.updateSize()},100)}()}angular.module("InterventionsModule").controller("MoreInfoContoller",e),e.$inject=["Minimap","StylesFactory","intervention","$scope","$timeout"]}(),function(){"use strict";function e(){return{bindToController:!0,controller:"InterventionItemController",controllerAs:"intItemCtrl",restrict:"E",scope:{intervention:"="},templateUrl:"views/templates/interventions/interventionItem.html"}}angular.module("InterventionsModule").directive("interventionItem",e)}(),function(){"use strict";function e(){return{bindToController:!0,controller:t,controllerAs:"intTabCtrl",restrict:"E",scope:{},templateUrl:"views/templates/control-panel/interventionsTab.html"}}function t(e,t,n){var o=this;e.filterData={},e.filterDate={},o.setPriority=function(t){e.filterData.priority=t},o.setInterType=function(t){o.selInterType=t,e.filterData.id_type=t},o.resetFilter=function(){e.filterData={},e.filterDate={},o.selInterType="--"},function(){t.get().then(function(e){o.interTypes=e,o.selInterType="--"}),e.$watch("filterData",function(e,t){n.setFilter(e)},!0),e.$watch("filterDate",function(e,t){n.setFilterDate(e)},!0)}()}angular.module("InterventionsModule").directive("interventionsTab",e),t.$inject=["$scope","InterventionTypesFactory","FilterDataService"]}(),function(){"use strict";function e(e){return function(t,n,o,r){return e("filter")(t,function(e){var t=moment(e[n]);return!o&&!r||t>=moment(o)&&t<=moment(r)})}}angular.module("InterventionsModule").filter("dateFilter",e),e.$inject=["$filter"]}(),function(){"use strict";function e(){function e(e){r=e}function t(){return r}function n(e){i=e}function o(){return i}var r={},i={};this.setFilter=e,this.getFilter=t,this.getFilterDate=o,this.setFilterDate=n}angular.module("InterventionsModule").service("FilterDataService",e)}(),function(){"use strict";function e(e,t){function n(){var t=e.defer();return t.resolve([1,2,3,4,5,6]),t.promise}return{get:n}}angular.module("InterventionsModule").factory("InterventionTypesFactory",e),e.$inject=["$q","$http"]}(),function(){"use strict";function e(e,t){function n(){var n=e.defer();return t({method:"GET",url:"/api/interventions"}).then(function(e){n.resolve(e.data)},function(e){n.reject(e)}),n.promise}function o(n){var o=e.defer();return t({method:"GET",url:"api/interventions/"+n}).then(function(e){o.resolve(e.data)},function(e){o.reject(e)}),o.promise}function r(n){var o=e.defer();return t({method:"PUT",url:"api/interventions/"+n.id,headers:{"Content-Type":"application/json"},data:n}).then(function(e){o.resolve(e.data)},function(e){o.reject(e)}),o.promise}function i(e){return r(e)}this.getAllInterventions=n,this.getIntervention=o,this.closeIntervention=i,this.updateIntervention=r}angular.module("InterventionsModule").service("InterventionsService",e),e.$inject=["$q","$http"]}(),function(){"use strict";function e(e){var t,n=this;n.showControlPanel=function(){e.cPanelVisibility=!0},e.$on("controlPanel:panelVisibility",function(n,o){n.stopPropagation(),t=e.cPanelVisibility=o}),e.$on("$destroy",function(e){t()}),function(){e.cPanelVisibility=!0}()}angular.module("MainModule").controller("MainController",e),e.$inject=["$scope"]}(),function(){"use strict";function e(){return{restrict:"A",scope:{title:"@"},transclude:!0,templateUrl:"views/templates/legendItem.html"}}angular.module("LegendsModule").directive("legendItem",e)}(),function(){"use strict";function e(){return{bindToController:!0,controller:t,controllerAs:"lgCtrl",restrict:"E",scope:{},templateUrl:"views/templates/control-panel/legendsTab.html"}}function t(e){this.groups=e.groups}angular.module("LegendsModule").directive("legendsTab",e),t.$inject=["LegendsService"]}(),function(){"use strict";function e(e){function t(e,t){return e.findIndex(function(e){return e.title==this.title},t)}function n(e,t){return e.findIndex(function(e){return e._key==this.data.key},t)}function o(e,t){e.splice(t,1)}this.groups=[],this.addLayerLegend=function(o){var r=o.data.style||"",i=t(this.groups,o.parent);if(i>-1){var a=n(this.groups[i].data,o);-1==a?this.groups[i].data.push({_key:o.data.key,title:o.title,url:e.URL_WMS[e.ENVIRONMENT]+"?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+o.data.workspace+":"+o.data.name+"&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style="+r}):this.groups[i].data[a]={_key:o.data.key,title:o.title,url:e.URL_WMS[e.ENVIRONMENT]+"?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+o.data.workspace+":"+o.data.name+"&LEGEND_OPTIONS=forceLabels:on;fontSize:11&SCALE=1000000&Style="+r}}else this.groups.push({title:o.parent.title,data:[]}),this.addLayerLegend(o)},this.removeLayerLegend=function(e){var r=t(this.groups,e.parent),i=n(this.groups[r].data,e);o(this.groups[r].data,i),0==this.groups[r].data.length&&o(this.groups,r)}}angular.module("LegendsModule").service("LegendsService",e),e.$inject=["Globals"]}(),function(){"use strict";function e(e){function t(e){this.map=new ol.Map({target:e._mapTarget,layers:e._defaultLayers,interactions:e._interactions,controls:e._controls,view:e._defaultView}),this._defaultConfig={},this._layers={},this._userFeatures={},angular.copy(e,this._defaultConfig)}function n(e){return void 0===e?e:Math.floor(156543.04/Math.pow(2,e))}return t.prototype.getMapObject=function(){return this.map},t.prototype.setTarget=function(e){this.map.setTarget(document.getElementById(e))},t.prototype.updateSize=function(){this.map.updateSize()},t.prototype.setDefaultView=function(e){this.map.setView(this._defaultConfig._defaultView)},t.prototype.setCenter=function(e,t){var n=t||"EPSG:4326";this.map.getView().setCenter(ol.proj.transform(e,ol.proj.get(n),"EPSG:3857"))},t.prototype.setZoom=function(e){this.map.getView().setZoom(e)},t.prototype.setCenterAndZoom=function(e,t,n){this.setCenter(e,n),this.setZoom(t)},t.prototype.zoomToCoordinate=function(e,t){var n=t||"EPSG:4326";this.map.getView().animate({center:ol.proj.transform(e,ol.proj.get(n),"EPSG:3857"),duration:1e3,zoom:16})},t.prototype.setBaseLayer=function(e){this.map.getLayers().setAt(0,e)},t.prototype.addLayer=function(e,t){return"WMS"===e.type?this._addWMSLayer(e):"TileWMS"===e.type?this._addTiledWMSLayer(e):this._addWFSLayer(e,t)},t.prototype._addWFSLayer=function(e,t){if(this._checkLayer(e.key)){var n=new ol.layer.Vector({source:new ol.source.Vector({loader:function(t){$.ajax("http://localhost:3000/geoserver/wfs",{type:"GET",data:{service:"WFS",version:"1.1.1",request:"GetFeature",typename:e.workspace+":"+e.name,srsname:"EPSG:27493",outputFormat:"application/json",bbox:ol.proj.transformExtent(t,"EPSG:3857",ol.proj.get("EPSG:27493")).join(",")+","+ol.proj.get("EPSG:27493").getCode(),format_options:"id_policy:gid"},crossDomain:!0}).done(function(e){n.getSource().addFeatures((new ol.format.GeoJSON).readFeatures(e,{featureProjection:"EPSG:3857",dataProjection:ol.proj.get("EPSG:27493")}))})},strategy:ol.loadingstrategy.bbox})});this._layers[e.key]=n,e.style&&(n.setStyle(t),n.setOpacity(e.opacity)),this.map.addLayer(n),this._layers[e.key].visible=!0}else this._layers[e.key].visible?this._layers[e.key].setStyle(t):(this._layers[e.key].setStyle(t),this.map.addLayer(this._layers[e.key]),this._layers[e.key].visible=!0);return this._layers[e.key]},t.prototype._addWMSLayer=function(t){if(this._checkLayer(t.key)){var o=new ol.layer.Image({opacity:t.opacity,source:new ol.source.ImageWMS({url:e.URL_WMS[e.ENVIRONMENT],params:{LAYERS:t.workspace+":"+t.name},extent:t.extent}),minResolution:n(t.maxZoom),maxResolution:n(t.minZoom),group:t.group,queryable:t.queryable});this._layers[t.key]=o,this.map.getLayers().insertLayer(o),this._layers[t.key].visible=!0}else this._layers[t.key].visible||(this.map.getLayers().insertLayer(this._layers[t.key]),this._layers[t.key].visible=!0)},t.prototype._addTiledWMSLayer=function(t){if(this._checkLayer(t.key)){var o=new ol.layer.Tile({opacity:t.opacity,source:new ol.source.TileWMS({url:e.URL_WMS[e.ENVIRONMENT],params:{LAYERS:t.workspace+":"+t.name},extent:t.extent}),minResolution:n(t.maxZoom),maxResolution:n(t.minZoom),group:t.group,queryable:t.queryable});this._layers[t.key]=o,this.map.getLayers().insertLayer(o),this._layers[t.key].visible=!0}else this._layers[t.key].visible||(this.map.getLayers().insertLayer(this._layers[t.key]),this._layers[t.key].visible=!0)},t.prototype._checkLayer=function(e){return!this._layers.hasOwnProperty(e)},t.prototype.removeLayer=function(e){this._layers[e.key]&&(this.map.removeLayer(this._layers[e.key]),this._layers[e.key].visible=!1)},t}angular.module("MapModule").factory("MapFactory",e),e.$inject=["Globals"]}(),function(){"use strict";function e(){var e={};this.setInteractions=function(t){e._interactions=t},this.setControls=function(t){e._controls=t},this.setDefaultView=function(t){e._defaultView=t},this.setCenterAndZoom=function(t,n){e._center=t,e._zoom=n,e._defaultView=new ol.View({center:ol.proj.transform(e._center,"EPSG:4326","EPSG:3857"),zoom:e._zoom,minZoom:11})},this.setDefaultLayers=function(t){e._defaultLayers=t},this.$get=["MapFactory",function(t){return new t(e)}]}angular.module("MapModule").provider("Map",e).provider("Minimap",e)}(),function(){"use strict";function e(){function e(){this.treeDefault=function(){return e.defaultStyle},this.treeHighlight=function(t,n){return t==n?e.purplePoint:e.defaultStyle},this.treeIntervention=function(t){return t.getProperties().has_inter?e.redPoint:e.defaultStyle};var e={purplePoint:new ol.style.Style({image:new ol.style.Circle({radius:4,fill:new ol.style.Fill({color:[72,24,70,1]}),stroke:new ol.style.Stroke({color:[0,0,0,1],width:2})})}),redPoint:new ol.style.Style({image:new ol.style.Circle({radius:4,fill:new ol.style.Fill({color:[72,15,15,1]}),stroke:new ol.style.Stroke({color:[0,0,0,1],width:2})}),zIndex:100}),defaultStyle:new ol.style.Style({image:new ol.style.Circle({radius:3,fill:new ol.style.Fill({color:[24,72,26,.8]}),stroke:new ol.style.Stroke({color:[0,0,0,1]})})})}}return e}angular.module("MapModule").factory("StylesFactory",e)}(),function(){"use strict";function e(e){function t(t,n,o){e.map.addControl(new ol.control.MousePosition({coordinateFormat:function(e){return ol.coordinate.format(e," {x} , {y} ",4)},projection:"EPSG:4326",className:"",target:document.getElementById("coordinate4326"),undefinedHTML:"&nbsp;"})),e.map.addControl(new ol.control.MousePosition({coordinateFormat:function(e){return ol.coordinate.format(e," {x} , {y} ",4)},projection:ol.proj.get("EPSG:27493"),className:"",target:document.getElementById("coordinate27493"),undefinedHTML:"&nbsp;"}))}return{bindToController:!0,controller:"MapInteractionsController",controllerAs:"itCtrl",link:t,restrict:"E",templateUrl:"views/templates/map-interactions/interactions.html"}}angular.module("MapInteractionsModule").directive("mapInteractions",e),e.$inject=["Map"]}(),function(){"use strict";function e(e,t){var n=this;!function(){n.results=[]}(),n.title="Resultados da Pesquisa",e.$watchCollection(function(){return t.getResults()},function(e){n.results=e}),n.hasResults=function(){return n.results.length>0}}angular.module("MapInteractionsModule").controller("LayerResultsController",e),e.$inject=["$scope","LayerQueryResultsService"]}(),function(){"use strict";function e(e,t){var n=this;!function(){e.get().then(function(e){n.locations=e.features}),n.location={}}(),n.onSelectCallback=function(e){t.zoomToCoordinate(e.geometry.coordinates,"EPSG:3857")}}angular.module("MapInteractionsModule").controller("LocationController",e),e.$inject=["LocationsService","Map"]}(),function(){"use strict";function e(e,t,n){var o=this;o.isActive=function(e){return o.active==e},o.setDefaultView=function(e){n.setDefaultView()},o.setInteraction=function(e){t.setMapInteraction(e)},o.showSearchBar=function(){o.search=!o.search},o.isSearch=function(){return!o.search},e.$watch(function(){return t.getMapInteraction()},function(e){o.active=e,o.currentInteraction=t.getText()}),function(){t.setMapInteraction("DragPan"),o.search=!1}()}angular.module("MapInteractionsModule").controller("MapInteractionsController",e),e.$inject=["$scope","MapInteractionsService","Map"]}(),function(){"use strict";function e(){return function(e){return angular.isNumber(e)?e:e?e.charAt(0).toUpperCase()+e.substr(1).toLowerCase():""}}angular.module("MapInteractionsModule").filter("capitalize",e)}(),function(){"use strict";angular.module("MapInteractionsModule").filter("propsFilter",function(){return function(e,t){var n=[];if(angular.isArray(e)){var o=Object.keys(t);e.forEach(function(e){for(var r=!1,i=0;i<o.length;i++){var a=o[i],l=t[a].toLowerCase();if(-1!==e[a].toString().toLowerCase().indexOf(l)){r=!0;break}}r&&n.push(e)})}else n=e;return n}})}(),function(){"use strict";function e(e){function t(t,n,i){i.forEach(function(i){if(i.isQueryable()){var a=i.getSource().getGetFeatureInfoUrl(ol.proj.transform(t.coordinate,"EPSG:3857",ol.proj.get("EPSG:27493")),n.getResolution(),ol.proj.get("EPSG:27493"),{INFO_FORMAT:"application/json"});if(a){o();new ol.format.GeoJSON;e({url:a}).then(function(e){e.data.features.length>0&&r.push(e.data)})}}})}function n(){return r}function o(){r.length=0}var r=[];this.getResults=n,this.getLayersInfo=t,this.clearResults=o}angular.module("MapInteractionsModule").service("LayerQueryResultsService",e),e.$inject=["$http"]}(),function(){"use strict";function e(e,t){function n(){var n=t.defer();return e({method:"GET",url:"/locations"}).then(function(e){n.resolve(e.data)},function(e){n.reject(e)}),n.promise}return{get:n}}angular.module("MapInteractionsModule").factory("LocationsService",e),e.$inject=["$http","$q"]}(),function(){"use strict";function e(e,t,n){var o={interaction:"",interactionText:""},r=e.getMapObject();this.setMapInteraction=function(e){switch(r.getInteractions().pop(),e){case"DragPan":o.interactionText="Mover Mapa",r.addInteraction(new ol.interaction.DragPan);break;case"ZoomIn":o.interactionText="Aproximar Mapa",r.addInteraction(new ol.interaction.Pointer({handleDownEvent:function(e){var t=r.getView();t.setCenter(e.coordinate),t.setZoom(t.getZoom()+1)}}));break;case"ZoomOut":o.interactionText="Afastar Mapa",r.addInteraction(new ol.interaction.Pointer({handleDownEvent:function(e){var t=r.getView();t.setCenter(e.coordinate),t.setZoom(t.getZoom()-1)}}));break;case"ZoomBox":o.interactionText="Fazer Zoom de Caixa",r.addInteraction(new ol.interaction.DragZoom({condition:ol.events.condition.always,className:"drag_zoom_box"}));break;case"Identify":o.interactionText="Identificar Camadas",r.addInteraction(new ol.interaction.Pointer({handleDownEvent:function(e){t.getLayersInfo(e,e.map.getView(),e.map.getLayers().getArray())}}))}o.interaction=e},this.getMapInteraction=function(){return o.interaction},this.getText=function(){return o.interactionText},this.setText=function(e){o.interactionText=e}}angular.module("MapInteractionsModule").service("MapInteractionsService",e),e.$inject=["Map","LayerQueryResultsService","$http"]}(),function(){"use strict";function e(e,t){var n=this;n.reset=function(){n.filter={},n.printResults=void 0},n.print=function(t){console.log("Filter",t),console.log("Printing"),e.print(t).then(function(e){console.log("PrintService::Print()",e)}).catch(function(e){console.log("PrintService::Print()",e)})},function(){n.filter={}}()}angular.module("PrintModule").controller("PrintController",e),e.$inject=["PrintService","$timeout"]}(),function(){"use strict";function e(){function e(e,t,n){}return{bindToController:!0,controller:"PrintController",controllerAs:"printCtrl",link:e,restrict:"E",scope:{},templateUrl:"views/templates/control-panel/printTab.html"}}angular.module("PrintModule").directive("printTab",e)}(),function(){"use strict";function e(e,t,n){function o(t){var o={layout:"gestreeLayout",srs:"EPSG:27493",units:"m",outputFormat:"pdf",mapTitle:"Gestree - Intervenções",layers:[{type:"WMS",format:"image/png",layers:["unicer:limite","unicer:base","unicer:edificios"],baseURL:"http://gistree.espigueiro.pt:8081/geoserver/wms"},{type:"WMS",format:"image/png",layers:["unicer:arvores"],baseURL:"http://gistree.espigueiro.pt:8081/geoserver/wms",styles:["treeIntervention"]}],pages:[{center:ol.proj.transform(n.map.getView().getCenter(),"EPSG:3857",ol.proj.get("EPSG:27493")),scale:1500,dpi:300}]},i=angular.extend(o,t);return e.post("http://gistree.espigueiro.pt:8081/geoserver/pdf/create.json",i).then(function(e){console.log("Response",e),r.resolve(e)},function(e){console.log("Error",e),r.reject(e)}),r.promise}var r=t.defer();console.log("Center",ol.proj.transform(n.map.getView().getCenter(),"EPSG:3857",ol.proj.get("EPSG:27493"))),this.print=o}angular.module("PrintModule").service("PrintService",e),e.$inject=["$http","$q","Map"]}();