(function () {
    'use strict';

    angular
        .module('PrintModule')
        .service('PrintPdfService', PrintPDFService);

    PrintPDFService.$inject = ['PrintGlobals', '$q', '$http', '$timeout', '$window'];

    function PrintPDFService(PrintGlobals, $q, $http, $timeout, $window) {

        this.print = _print;

        function _print(data, callback) {
            $http({
                method: 'POST',
                url: PrintGlobals.url_pdf_print,
                data: data,
            }).then(function (response) {
                checkStatus(PrintGlobals.url_print_host + response.data.statusURL, printResult, callback);
            }).catch(function (err) {
                callback(err);
            });
        }

        function checkStatus(url, printResult, callback) {
            $http({
                method: 'GET',
                url: url,
            }).then(function (response) {
                printResult(response, callback);
            }).catch(function (err) {
                callback(err);
            });
        };

        function printResult(response, callback) {
            console.log("Print Result!");
            console.log(response);
            if (response.data.done) {
                callback(null, PrintGlobals.url_print_host + response.data.downloadURL);
            } else {
                $timeout(function () {
                    checkStatus(response.config.url, printResult, callback);
                }, 2500);
            }
        }

    };
})();