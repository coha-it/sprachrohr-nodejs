var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var apiRouter = require('./routes/routes');
var app = express();
require('dotenv').config();

// Connect Mongoose DB
mongoose
.connect(
  'mongodb://' + (process.env.DB_HOST || 'localhost') + 
  ':' + (process.env.DB_PORT || 27017) + 
  '/' + (process.env.DB_NAME) + 
  '?authSource=' + (process.env.DB_AUTHSRC),
  {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(
  () => {
    console.log('Database connection is successful');
  },
  err => {
    console.log('Error when connecting to the database ', err);
  }
);

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api', apiRouter);

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
  res.json('error');
});

module.exports = app;
