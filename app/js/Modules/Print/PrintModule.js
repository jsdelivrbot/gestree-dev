(function () {
    'use strict';

    angular.module('PrintModule', [])
        .constant('PrintGlobals', {
            url_print_host: "http://gistree.espigueiro.pt:8081",
            url_pdf_print: "http://gistree.espigueiro.pt:8081/print-servlet-3.8.0/print/gestree/report.pdf"
        })
        .run(['ControlPanelService', function (cPanelService) {
        cPanelService.addTab({
            id: 4,
            name: "Imprimir",
            tooltip: "Imprimir",
            iconClass: "my-icon-print",
            location: "/"
        });
    }]);
})();