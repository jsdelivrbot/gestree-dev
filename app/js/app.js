angular
  .module('unicerApp', [
    'ui.select',
    'ngSanitize',
    'ngMaterial',
    'ngMessages',
    'ngRoute'
  ])
  .constant('GlobalURLs', {
    // DEV
    host: "http://gistree.espigueiro.pt:8081",
    print: "http://gistree.espigueiro.pt:8081/print-servlet-3.8.0/print/gestree/report.pdf"
    // PROD
    //host: "http://localhost:8081",
    //print: "http://localhost:8081/print-servlet-3.8.0/print/gestree/report.pdf"
  });