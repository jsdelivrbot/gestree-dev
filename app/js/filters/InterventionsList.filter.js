angular
  .module('unicerApp')
  .filter('interventions-filter', InterventionListFilter);

function InterventionListFilter() {
  return function (input, filterData) {
    var filteredInterventions = input;

    if (_hasNoFilters(filterData)) {
      return input;
    }

    for (var prop in filterData) {
      filteredInterventions = _filterArray(filteredInterventions, filterData, prop);
    }
    return filteredInterventions;
  };

  function _filterArray(array, filter, prop) {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i][prop] === filter[prop]) {
        filtered.push(array[i]);
      }
    }
    return filtered;
  }

  function _hasNoFilters(filterData) {
    for (var prop in filterData) {
      if (filterData.hasOwnProperty(prop))
        return false;
    }
    return true;
  };
}