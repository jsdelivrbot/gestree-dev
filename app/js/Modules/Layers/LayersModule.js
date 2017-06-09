(function () {
    'use strict';

    angular.module('LayersModule', [])
        .run(['ControlPanelService', function (cPanelService) {
            cPanelService.addTab({
                id: 1,
                name: "Camadas",
                tooltip: "Camadas",
                iconClass: "my-icon-camadas",
                location: "/"
            });
        }]);
})();