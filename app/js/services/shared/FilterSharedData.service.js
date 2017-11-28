angular
  .module('unicerApp')
  .service('FilterSharedData', FilterSharedData);

function FilterSharedData() {
  var filterData = {};

  return {
    setFilter: set,
    getFilter: get
  }

  function set(filter) {
    filterData = filter;
  }
  function get() {
    return filterData;
  }

}