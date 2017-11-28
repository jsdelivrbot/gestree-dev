angular
  .module('unicerApp')
  .filter('capitalize', Capitalize);

function Capitalize() {
  return function (input) {
    if (!angular.isNumber(input)) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    } else {
      return input;
    }
  }
}