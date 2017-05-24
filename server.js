var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var rtLayers = require(path.join(__dirname, 'server/routes/layers.js'));
var rtLocations = require(path.join(__dirname, 'server/routes/locations.js'));
var rtProxy = require(path.join(__dirname, 'server/routes/geoserver.js'));
var rtAPI = require(path.join(__dirname, 'server/routes/api.js'));

app.use('/layers', rtLayers(express.Router()));
app.use('/locations', rtLocations(express.Router()));
app.use('/geoserver', rtProxy(express.Router()));
app.use('/api', rtAPI(express.Router()));

app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: './public'
    });
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;