angular
  .module('unicerApp')
  .directive('printTab', PrintTab);

function PrintTab() {
  var directive = {
    bindToController: true,
    controller: PrintController,
    controllerAs: 'printCtrl',
    restrict: 'E',
    scope: {},
    templateUrl: 'views/templates/navigation/tabs/Tab-Print.html'
  };
  return directive;


  PrintController.$inject = ['$scope', 'PrintManager'];

  function PrintController($scope, PrintManager) {
    $scope.printData = {};

    PrintManager.getPrintDefaults()
      .then(function (defaults) {
        $scope.defaults = defaults;
      });


    $scope.print = print;
    $scope.newPrint = newPrint;
    $scope.setPark = setPark;
    $scope.setContent = setContent;
    $scope.setSeason = setSeason;
    $scope.setYear = setYear;
    $scope.setFormat = setFormat;

    function print() {
      var data = $scope.printData;
      if (!_requiredFields()) {
        return;
      }
      $scope.isPrinting = true;
      switch (data.format.key) {
        case 'csv':
          PrintManager.getCSVLinks(data).then(_handleResults);
          break;
        case 'pdf':
          PrintManager.getPDFLinks(data).then(_handleResults);
          break;
      }
      function _handleResults(fileParams) {
        $scope.isPrinting = false;
        $scope.file = fileParams;
      }
    }
    function newPrint() {
      $scope.printData = {};
      $scope.printFilters = false;
      delete $scope.file;
    }

    function setPark(p) {
      $scope.printData.park = p;
    }
    function setContent(c) {
      $scope.printFilters = (c.key === 'interventions')
      $scope.printData.contentType = c;
    }
    function setSeason(s) {
      $scope.printData.season = s;
    }
    function setYear(y) {
      $scope.printData.year = y;
    }
    function setFormat(f) {
      $scope.printData.format = f;
    }

    function _requiredFields() {
      var errors = { size: 0 };
      var requiredFields = ['park', 'contentType', 'format'];
      requiredFields.map(function (field, index) {
        if (!$scope.printData.hasOwnProperty(field)) {
          errors[field] = true;
          errors.size++;
        }
      });
      if (errors.size > 0) {
        errors.message = "* Falta Preencher Campos Obrigatórios";
      }
      $scope.errors = errors;
      return errors.size === 0;
    }

  }
}