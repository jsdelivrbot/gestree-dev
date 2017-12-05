angular
  .module('unicerApp', [
    'ui.select',
    'ngSanitize',
    'ngMaterial',
    'ngMessages',
    'ngRoute'
  ])
  .constant('GlobalURLs', {
    host: "http://gistree.espigueiro.pt",
    print: "http://gistree.espigueiro.pt:8081/print-servlet-3.8.0/print/gestree/report.pdf"
  });