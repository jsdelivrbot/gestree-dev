angular
  .module('unicerApp')
  .service('SortingService', SortingService);

SortingService.$inject = ['DefaultInterventionData'];

function SortingService(Defaults){

  return {
    orderBySeasonYear: orderBySeasonYear
  };

  function orderBySeasonYear(intervention) {
    var date = new Date(
      intervention.year,
      Defaults.getSeasons().indexOf(intervention.season) + 3,
      1
    );
    return date.getTime();
  }
}  