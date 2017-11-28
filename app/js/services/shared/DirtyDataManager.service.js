angular
  .module('unicerApp')
  .service('DirtyDataManager', DirtyDataManager);

function DirtyDataManager(){
  var dirtyTree = true,
      dirtyLayers = true;

  return {
    setDirty: setDataDirty,
    isLayerDirty: isTreeDirty,
    isTreeDirty: isTreeDirty,
    cleanTree: cleanTree,
    cleanLayer: cleanLayer
  };

  function setDataDirty(){
    dirtyTree = true;
    dirtyLayers = true;
  }
  function isLayerDirty(){
    return dirtyLayers;
  };
  function isTreeDirty(){
    return dirtyTree;
  };
  function cleanTree(){
    dirtyTree = false;
  };
  function cleanLayer(){
    dirtyLayers = false;
  };
}  