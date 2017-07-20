(function () {
    'use strict';

    angular
        .module('PrintModule')
        .controller('PrintController', PrintController);

    PrintController.$inject = ['RequestObjectFactory', 'PrintService', '$timeout'];

    function PrintController(RequestObject, PrintService, $timeout) {
        var printCtrl = this;
        var RequestObjectFactory = new RequestObject();
        var requestType;
        printCtrl.values = {};
        printCtrl.interFilters = false;

        printCtrl.setParque = function (p) {
            printCtrl.values.parque = p.value;
            RequestObjectFactory.setParque(p);
        };

        printCtrl.setContent = function (c) {
            printCtrl.interFilters = (c.key == 'inter');
            printCtrl.values.content = c.value;
            RequestObjectFactory.setContentType(c);
        }

        printCtrl.setSeason = function (s) {
            printCtrl.values.season = s.value;
            RequestObjectFactory.setSeason(s);
        }

        printCtrl.setYear = function (y) {
            printCtrl.values.year = y.value;
            RequestObjectFactory.setYear(y);
        }

        printCtrl.setFormat = function (f) {
            printCtrl.values.format = f.value;
            RequestObjectFactory.setFormat(f);
        }

        printCtrl.print = function (form) {
            // TODO - Validar os Campos (Preenchimento Obrigatório)
            validadeFields(printCtrl.values, function (isValid, requiredFields) {
                printCtrl.errors = {};
                if (isValid) {
                    if (RequestObjectFactory.getFormat() === 'csv') {
                        console.log(RequestObjectFactory.getRequestObject());
                    } else {
                        console.log(RequestObjectFactory.getRequestObject());
                    }
                } else {
                    requiredFields.forEach(function (v) {
                        printCtrl.errors[v] = true;
                        printCtrl.errors.message = "Falta preencher campos obrigatórios";
                    });
                }
            });
        }
        config();

        function config() {
            printCtrl.defaults = {
                parques: [{
                    key: 'pedras',
                    value: 'Parque de Pedras Salgadas'
                }, {
                    key: 'vidago',
                    value: 'Vidago Palace Hotel'
                }],
                contents: [{
                        key: 'arvores',
                        value: "Árvores"
                    },
                    {
                        key: 'inter',
                        value: "Intervenções"
                    }
                ],
                seasons: [{
                        key: 1,
                        value: "Primavera"
                    }, {
                        key: 2,
                        value: "Verão"
                    },
                    {
                        key: 3,
                        value: "Outono"
                    },
                    {
                        key: 4,
                        value: "Inverno"
                    }
                ],
                years: [{
                        key: 2017,
                        value: 2017
                    },
                    {
                        key: 2018,
                        value: 2018
                    },
                    {
                        key: 2019,
                        value: 2019
                    },
                    {
                        key: 2020,
                        value: 2020
                    },
                    {
                        key: 2021,
                        value: 2021
                    }
                ],
                formats: [{
                    key: 'csv',
                    value: ".csv (Comma Separated Values)"
                }, {
                    key: "pdf",
                    value: ".pdf (Printable Document Format)"

                }]
            }
        }
        sandbox();

        function sandbox() {
            var arvoresObjects = [{
                    id: 1,
                    zone: 2,
                    cientific: "Pinus",
                    comon: "Pinheiro"
                },
                {
                    id: 1,
                    cientific: "Pinus",
                    comon: "Pinheiro",
                    zone: 4,
                },
                {
                    id: 1,
                    cientific: "Pinus",
                    comon: "Pinheiro",
                    zone: 2
                }
            ];
            console.log(getArvoresDataSource(arvoresObjects));
            var interventionsObjects = [{
                    id: 1,
                    id_type: 1,
                    id_tree: "Zona1.Arv1",
                    created_at: "2017-05-24T12:57:11.099Z",
                    intervention_date: "2017-05-24T12:57:11.099Z",
                    finished_at: "2017-07-04T22:00:00.000Z",
                    priority: 4,
                    state: "FECHADA",
                    season: "Primavera",
                    year: 2018,
                    parque: "pedras_salgadas"
                },
                {
                    id: 1,
                    id_type: 1,
                    id_tree: "Zona1.Arv2",
                    created_at: "2017-05-24T12:57:11.099Z",
                    intervention_date: "2017-05-24T12:57:11.099Z",
                    finished_at: "2017-07-04T22:00:00.000Z",
                    priority: 4,
                    state: "FECHADA",
                    season: "Primavera",
                    year: 2018,
                    parque: "pedras_salgadas"
                },
                {
                    id: 1,
                    id_type: "Zona2.Arv1",
                    id_tree: 1,
                    created_at: "2017-05-24T12:57:11.099Z",
                    intervention_date: "2017-05-24T12:57:11.099Z",
                    finished_at: "2017-07-04T22:00:00.000Z",
                    priority: 4,
                    state: "FECHADA",
                    season: "Primavera",
                    year: 2018,
                    parque: "pedras_salgadas"
                }
            ];

            var columns = [];
            for (var prop in interventionsObjects[0]) {
                if (interventionsObjects[0].hasOwnProperty(prop)) {
                    columns.push(prop);
                }
            }
            for (var i = 0; i < interventionsObjects.length; i++) {
                if (!(interventionsObjects[i] instanceof Array)) {
                    interventionsObjects[i] = columns.map(function (key) {
                        if (interventionsObjects[i].hasOwnProperty(key)) {
                            return interventionsObjects[i][key];
                        } else {
                            return null;
                        }
                    })
                }
            }
            console.log(interventionsObjects);
            
        }
    }

    function validadeFields(validationObj, callback) {
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

    function getArvoresDataSource(arvores) {
        var columns = [];
        for (var prop in arvores[0]) {
            if (arvores[0].hasOwnProperty(prop)) {
                columns.push(prop);
            }
        }
        for (var i = 0; i < arvores.length; i++) {
            if (!(arvores[i] instanceof Array)) {
                arvores[i] = columns.map(function (key) {
                    if (arvores[i].hasOwnProperty(key)) {
                        return arvores[i][key];
                    } else {
                        return null;
                    }
                })
            }
        }
        return {
            title: "Árvores",
            table: {
                columns: columns,
                data: arvores
            }
        }
    }

})();