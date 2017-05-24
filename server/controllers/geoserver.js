'use strict';

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var proxyConf = require('../config/proxy_config');

module.exports = {
    reverseWMS(req, res) {
        apiProxy.web(req, res, {
            target: proxyConf[process.env["NODE_ENV"]].url_wms
        });
    },
    reverseWFS(req, res) {
        apiProxy.web(req, res, {
            target: proxyConf[process.env["NODE_ENV"]].url_wfs
        });
    },
    print(req, res) {
        apiProxy.web(req, res, {
            target: proxyConf[process.env["NODE_ENV"]].url_print
        });
    }
};