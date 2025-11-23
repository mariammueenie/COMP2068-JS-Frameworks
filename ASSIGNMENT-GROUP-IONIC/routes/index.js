// routes/index.js
// ------------------------------------------------------------
// This router handles the Home (/) page for the portfolio.
// It simply passes a title into the 'index' Handlebars view.
// ------------------------------------------------------------
const express = require('express');
const router = express.Router();

// GET /
router.get('/', function(req, res) {
  // The 'title' will appear in the layout <title> and on the page.
  res.render('index', { title: 'Home' });
});

module.exports = router;
