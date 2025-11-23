// app.js
// ============================================================
// Main Express application setup for the Jane Doe portfolio.
//
// This file:
// - Configures the view engine (Handlebars via hbs)
// - Registers a global {{year}} helper for the footer
// - Serves static files from /public
// - Mounts routers for Home, About, Projects, and Contact
// - Sets up basic 404 + error handling
//
// This structure mirrors what Express Generator typically does,
// and is safe to deploy to services like Render, Azure, etc.
// ============================================================

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs'); // Handlebars view engine

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');

const app = express();

// ------------------------------------------------------------
// View engine setup
// ------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register a simple Handlebars helper for the current year.
// Usage in templates: {{year}}
hbs.registerHelper('year', () => new Date().getFullYear());

// Helper to join an array into a single string (e.g., for data-* attributes)
// Usage in templates: {{join someArray ', '}}
hbs.registerHelper('join', function(array, separator) {
  if (!Array.isArray(array)) return '';
  return array.join(separator || ', ');
});


// If you later add partials (e.g., shared components), you can
// register them like this:
// hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// ------------------------------------------------------------
// Middleware
// ------------------------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve any files in /public (CSS, client-side JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------------------------------
// Routes
// ------------------------------------------------------------
// Each router is responsible for a group of pages.
// They all render Handlebars views found in /views.
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/projects', projectsRouter);
app.use('/contact', contactRouter);

// ------------------------------------------------------------
// Catch 404 and forward to error handler
// ------------------------------------------------------------
app.use(function(req, res, next) {
  next(createError(404));
});

// ------------------------------------------------------------
// Error handler
// ------------------------------------------------------------
app.use(function(err, req, res, next) {
  // Set locals, only providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
