require('dotenv').config();        // Load environment variables from .env

const connectDB = require('./config/db'); // Mongo connection helper
connectDB(); // Connect to MongoDB before starting the app

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // <-- NEW: session support

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');        // now handles auth
var definitionsRouter = require('./routes/definitions'); // CRUD + approval

var app = express();

// ===============================
// SESSION MIDDLEWARE (AUTH CORE)
// ===============================
app.use(
  session({
    secret: 'super-secret-session-key', // in a real app, move to process.env
    resave: false,
    saveUninitialized: false
  })
);

// Make logged-in user available in all views as currentUser / isAdmin
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.isAdmin =
    req.session.user && req.session.user.role === 'admin';
  next();
});

// ===============================
// VIEW ENGINE SETUP
// ===============================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ===============================
// ROUTES
// ===============================

// Home page
app.use('/', indexRouter);

// Auth routes: /users/register, /users/login, /users/logout
app.use('/users', usersRouter);

// Definitions routes, including:
// - public list/search (approved only)
// - logged-in submit (pending)
// - admin-only edit/delete/approve
app.use('/definitions', definitionsRouter);

// ===============================
// 404 HANDLER
// ===============================
app.use(function (req, res, next) {
  next(createError(404));
});

// ===============================
// ERROR HANDLER
// ===============================
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
