(function () {
    'use strict';

    angular.module('PrintModule', [])
        .run(['ControlPanelService', function (cPanelService) {
        cPanelService.addTab({
            id: 4,
            name: "Imprimir",
            tooltip: "Imprimir",
            iconClass: "my-icon-imprimir",
            location: "/"
        });
    }]);
})();