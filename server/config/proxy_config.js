module.exports = {
    development: {
        url_wms: 'http://gistree.espigueiro.pt:8081/geoserver/wms/',
        url_wfs: 'http://gistree.espigueiro.pt:8081/geoserver/wfs/',
        url_print: 'http://gistree.espigueiro.pt:8081/geoserver/pdf/',
        url_print_create: 'http://gistree.espigueiro.pt:8081/geoserver/pdf/create.json'
    },
    production: {
        url_wms: process.env.WMS_URL,
        url_wfs: process.env.WFS_URL,
        url_print: process.env.PRINT_URL
    },
    staging: {
        url_wms: process.env.WMS_URL,
        url_wfs: process.env.WFS_URL,
        url_print: process.env.PRINT_URL
    },
    test: {
        url_wms: 'http://localhost:8081/geoserver/wms/',
        url_wfs: 'http://localhost:8081/geoserver/wfs/',
        url_print: 'http://localhost:8081/geoserver/pdf',
        url_print_create: 'http://gistree.espigueiro.pt:8081/geoserver/pdf/create.json'
    }
};