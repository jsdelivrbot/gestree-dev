(function () {
    'use strict';

    angular
        .module('PrintModule')
        .directive('printResult', PrintResult);

    function PrintResult() {
        var directive = {
            restrict: 'E',
            scope: {
                icon: '@',
                url: '@',
                ext: '@',
                name: '@',
                params: '<',
                click: "&onClick"
            },
            template: "<a target='_black' ng-href='{{url}}{{urlParams}}' ng-click='click()'> " +
                " <i class='print_result_icon fa {{icon || \"fa-file-o\"}}'></i>" +
                " <div class='print_result_text'>&nbsp;{{name}}.{{ext}}<div>" +
                "<a/>",
            link: function (scope, element, attrs) {
                scope.$watch('params', function () {
                    if (scope.params != undefined) {
                        scope.urlParams = '?' + Object.keys(scope.params).map(function (k) {
                            return encodeURIComponent(k) + '=' + encodeURIComponent(scope.params[k])
                        }).join('&');
                    }
                });
            },
        };
        return directive;
    }

})();