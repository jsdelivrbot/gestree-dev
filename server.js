const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const rtLayers = require(path.join(__dirname, 'server/routes/layers'));
const rtLocations = require(path.join(__dirname, 'server/routes/locations'));
const rtAPI = require(path.join(__dirname, 'server/routes/api'));
const rtPrint = require(path.join(__dirname, 'server/routes/print'));

app.use('/api', rtAPI(express.Router()));
app.use('/locations', rtLocations(express.Router()));
app.use('/layers', rtLayers(express.Router()));
app.use('/print', rtPrint(express.Router()));

app.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: './public'
  });
});

app.use('/*', function (req, res) {
  //res.redirect('/');
});

app.use(function (req, res, next) {
  const err = new Error('Not Found');
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