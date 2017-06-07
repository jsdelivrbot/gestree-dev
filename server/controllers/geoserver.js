'use strict';

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var proxyConf = require('../config/proxy_config');

module.exports = {
    reverseWMS(req, res) {
        apiProxy.web(req, res, {
            target: proxyConf[process.env["NODE_ENV"]].url_wms,
            proxyTimeout: 20000
        });
    },
    reverseWFS(req, res) {
        apiProxy.web(req, res, {
            target: proxyConf[process.env["NODE_ENV"]].url_wfs,
            proxyTimeout: 20000
        });
    },
    print(req, res) {
        apiProxy.web(req, res, {
            target: proxyConf[process.env["NODE_ENV"]].url_print,
            proxyTimeout: 20000
        });
    }
};