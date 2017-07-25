(function () {
    'use strict';

    angular
        .module('PrintModule')
        .service('ValidatorService', ValidatorService);

    function ValidatorService() {
        this.validateFields = validateFields;
        function validateFields(validationObj, callback) {
            var arrayInvalid = [];
            if (!validationObj.hasOwnProperty('parque')) arrayInvalid.push('parque');
            if (!validationObj.hasOwnProperty('format')) arrayInvalid.push('format');
            if (!validationObj.hasOwnProperty('content')) {
                arrayInvalid.push('content');
            } else {
                if (validationObj['content'] === 'Intervenções') {
                    if (!validationObj.hasOwnProperty('season')) arrayInvalid.push('season');
                    if (!validationObj.hasOwnProperty('year')) arrayInvalid.push('year');
                }
            }
            callback(arrayInvalid.length == 0, arrayInvalid);
        }
    }
})();