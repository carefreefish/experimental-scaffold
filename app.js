var chalk = require('chalk');
console.info(chalk.keyword('orange').italic('EXPRESS FLOW ROBOT: into app.js'));
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var excel = require('./routes/excel');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/javascripts/build'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', index);
app.use('/users', users);
app.use('/excel', excel);

app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.contentType(req.path.substr(req.path.lastIndexOf('.')));
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.get('*.css', function(req, res, next) {
  req.url = req.url + '.gz';
  res.contentType(req.path.substr(req.path.lastIndexOf('.')));
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'))); // ?

// last middleware prior error catch
app.use(function(req, res, next) {
  console.info(chalk.keyword('orange').italic('EXPRESS FLOW ROBOT: test last middleware prior error catch'));
  next();
});

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
console.info(chalk.keyword('orange').italic('EXPRESS FLOW ROBOT: endof app.js'));

