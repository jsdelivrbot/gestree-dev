(function () {
    'use strict';

    angular
        .module('BaseDocumentalModule')
        .service('BaseDocumentalService', BaseDocumentalService);

    function BaseDocumentalService() {
        this.getData = getData;
        this.getBaseAddress = getBaseAddress;

        function getBaseAddress() {
            return "http://www.cm-vilareal.pt/images/cidadao/urbanismo/PDM/";
        }

        function getData() {
            return [{
                    categoria: "Plantas de Condicionantes",
                    content: [{
                        subcategoria: "Áreas Florestais Percorridas por Incêndio",
                        content: [{
                            name: "PLANTA-A",
                            address: "ordenamento/areas_florestais_percorridas_incendio_planta_a.pdf"
                        }, {
                            name: "PLANTA-B",
                            address: "ordenamento/acustico_dia_planta_b.pdf"
                        }],
                        img: "app/img/a-b.png"
                    }, {
                        subcategoria: "Perigosidade de Incêndio",
                        content: [{
                            name: "PLANTA-A",
                            address: "ordenamento/risco_incendio_planta_a.pdf"
                        }, {
                            name: "PLANTA-B",
                            address: "ordenamento/risco_incendio_planta_b.pdf"
                        }],
                        img: "app/img/a-b.png"
                    }, {
                        subcategoria: "Planta de Condicionantes",
                        content: [{
                            name: "PLANTA-A",
                            address: "ordenamento/condicionantes_planta_a.pdf"
                        }, {
                            name: "PLANTA-B",
                            address: "ordenamento/condicionantes_planta_b.pdf"
                        }, {
                            name: "PLANTA-C",
                            address: "ordenamento/condicionantes_planta_c.pdf"
                        }, {
                            name: "PLANTA-D",
                            address: "ordenamento/condicionantes_planta_d.pdf"
                        }, {
                            name: "PLANTA-E",
                            address: "ordenamento/condicionantes_planta_e.pdf"
                        }, {
                            name: "PLANTA-F",
                            address: "ordenamento/condicionantes_planta_f.pdf"
                        }, {
                            name: "PLANTA-G",
                            address: "ordenamento/condicionantes_planta_g.pdf"
                        }],
                        img: "app/img/a-g.png"
                    }]
                },
                {
                    categoria: "Plantas de Ordenamento",
                    content: [{
                            subcategoria: "Qualificação do Solo",
                            content: [{
                                    name: "PLANTA-A",
                                    address: "ordenamento/solo_planta_a.pdf"
                                },
                                {
                                    name: "PLANTA-B",
                                    address: "ordenamento/solo_planta_b.pdf"
                                },
                                {
                                    name: "PLANTA-C",
                                    address: "ordenamento/solo_planta_c.pdf"
                                },
                                {
                                    name: "PLANTA-D",
                                    address: "ordenamento/solo_planta_d.pdf"
                                },
                                {
                                    name: "PLANTA-E",
                                    address: "ordenamento/solo_planta_e.pdf"
                                },
                                {
                                    name: "PLANTA-F",
                                    address: "ordenamento/solo_planta_f.pdf"
                                },
                                {
                                    name: "PLANTA-G",
                                    address: "ordenamento/solo_planta_g.pdf"
                                }
                            ],
                            img: "app/img/a-g.png"
                        },
                        {
                            subcategoria: "Zonamento Acústico",
                            content: [{
                                    name: "Dia | PLANTA-A",
                                    address: "ordenamento/acustico_dia_planta_a.pdf"
                                },
                                {
                                    name: "Dia | PLANTA-B",
                                    address: "ordenamento/acustico_dia_planta_b.pdf"
                                },
                                {
                                    name: "Noite | PLANTA-A",
                                    address: "ordenamento/acustico_noite_planta_a.pdf"
                                },
                                {
                                    name: "Noite | PLANTA-B",
                                    address: "ordenamento/acustico_noite_planta_a.pdf"
                                }
                            ],
                            img: "app/img/a-b.png"
                        }
                    ]
                },
                {
                    categoria: "Regulamento",
                    content: [{
                        subcategoria: "Regulamento",
                        content: [{
                            name: "Regulamento do Plano Diretor Municipal (Aviso n.º 7317 de 2011)",
                            address: "ordenamento/aviso7317_2011_PDMVR.pdf"
                        }]
                    }]
                },
                {
                    categoria: "Correcções Materiais",
                    content: [{
                        subcategoria: "Correcções Materiais",
                        content: [{
                            name: "Correção material do Plano Diretor Municipal de Vila Real - DR n.º 178/2013",
                            address: "dr_178_2013.pdf"
                        }, {
                            name: "Correção material do Plano Diretor Municipal de Vila Real - DR n.º 29/2014",
                            address: "dr_29_2014.pdf"
                        }, {
                            name: "Correção material do Plano Diretor Municipal de Vila Real - DR n.º 202/2014",
                            address: "dr_229_2014.pdf"
                        }]
                    }]
                },
                {
                    categoria: "Relatório de Discussão Pública",
                    content: [{
                        subcategoria: "Relatório de Discussão Pública",
                        content: [{
                            name: "Relatório de Discussão Pública",
                            address: "relat_discussao_publica_pdm.pdf"
                        }]
                    }]
                }
            ];
        }
    }
})();