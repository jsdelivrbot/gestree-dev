(function () {
    'use strict';

    angular
        .module('PrintModule')
        .controller('PrintController', PrintController);

    PrintController.$inject = [
        'PDFRequestObjectFactory',
        'ValidatorService',
        'PrintPdfService'
    ];

    function PrintController(RequestObjectFactory, ValidatorService, PrintPdfService) {
        var printCtrl = this;
        var RequestObjectFactory = new RequestObjectFactory();
        var requestType;
        printCtrl.values = {};
        printCtrl.interFilters = false;

        printCtrl.setParque = function (p) {
            printCtrl.values.parque = p;
            RequestObjectFactory.setParque(p);
        };

        printCtrl.setContent = function (c) {
            printCtrl.interFilters = (c.key == 'inter');
            printCtrl.values.content = c;
            RequestObjectFactory.setContentType(c);
        }

        printCtrl.setSeason = function (s) {
            printCtrl.values.season = s;
            RequestObjectFactory.setSeason(s);
        }

        printCtrl.setYear = function (y) {
            printCtrl.values.year = y;
            RequestObjectFactory.setYear(y);
        }

        printCtrl.setFormat = function (f) {
            printCtrl.values.format = f;
        }

        printCtrl.print = function (form) {
            ValidatorService.validateFields(printCtrl.values, function (isValid, requiredFields) {
                var data, filename, values;
                values = printCtrl.values;
                printCtrl.errors = {};
                printCtrl.file = {
                    ext: values.format.key,
                    name: values.content.value,
                    close: function () {
                        this.hasFile = false;
                    }
                };
                if (isValid) {
                    printCtrl.isPrinting = true;
                    if (values.format.key === 'csv') {
                        if (values.content.key === 'inter') {
                            printCtrl.file.name = values.content.value + "_" + values.parque.key + "_" + values.season.value + "_" + values.year.value;
                            printCtrl.file.params = {
                                parque: values.parque.key,
                                season: values.season.value,
                                year: values.year.value
                            }
                        } else {
                            printCtrl.file.name = values.content.value + "_" + values.parque.key;
                            printCtrl.file.params = {
                                parque: values.parque.key
                            }
                        }
                        printCtrl.isPrinting = false;
                        printCtrl.file.url = "/csv/" + values.content.key;
                        printCtrl.file.hasFile = true;
                    } else {
                        RequestObjectFactory.getRequestObject().then(function (data) {
                            console.log(data);
                            
                            /*PrintPdfService.print(JSON.stringify(data), function (err, url) {
                                if (err) console.log("There was an Error");
                                printCtrl.isPrinting = false;
                                printCtrl.file.name = values.content.value + "_" + values.parque.key + "_" + values.season.value + "_" + values.year.value;
                                printCtrl.file.url = url;
                                printCtrl.file.hasFile = true;
                            });*/
                        });
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
                        key: 'trees',
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
            };
        }
    }

})();