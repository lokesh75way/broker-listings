const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();
const indexRouter = require('./routes/index');
const connection = require('./config/connection');
const hbs = expressHbs.create({});

// Register new function
hbs.handlebars.registerHelper('formatDateTime', function (date, format) {
  return `${moment(date).utc().format(format)}`;
});

const app = express();

// View engine setup
app.engine('hbs', expressHbs.engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/" }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/datatables/media/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/chart.js/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/datatables/media/js')))

// DB connection
connection.connect((err, res) => {
  if (err) console.log("DB connection error >>>>> ", err);
  else console.log("Database Connected Successfully...")
})

app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
