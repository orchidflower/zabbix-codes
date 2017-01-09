var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var codes = require('./routes/codes');
var swagger = require('./routes/swagger');
var log4js = require('log4js');
var app = express();


// initialize log4js
log4js.configure('./config/log4js.conf.js', {reloadSecs: 300});
// get one logger 'access' and use it to replace morgan as the express middleware for access logging
var accessLogger = log4js.getLogger('access');
// logger.setLevel('DEBUG');
app.use(log4js.connectLogger(accessLogger, {level:log4js.levels.DEBUG, format: ':method :url :status :res[content-length] - :response-time ms'}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', index);
app.use('/users', users);
app.use('/api/codes', codes);
app.use('/swagger', swagger);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
