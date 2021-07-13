var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var xmlparser = require('express-xml-bodyparser');

var indexRouter = require('./routes/index');
var xml2jsRouter = require('./routes/xml2js');
var libxmljs2Router = require('./routes/libxmljs2');
var cheerioRouter = require('./routes/cheerio');
var svgsonRouter = require('./routes/svgson');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(xmlparser({
  normalizeTags: false
}));

app.use('/', indexRouter);
app.use('/xml2js', xml2jsRouter);
app.use('/libxmljs2', libxmljs2Router);
app.use('/cheerio', cheerioRouter);
app.use('/svgson', svgsonRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
