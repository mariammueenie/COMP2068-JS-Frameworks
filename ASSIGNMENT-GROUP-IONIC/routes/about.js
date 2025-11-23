// routes/about.js
// ------------------------------------------------------------
// This router handles the About page at /about.
// It renders the 'about' view with a simple title.
// ------------------------------------------------------------
const express = require('express');
const router = express.Router();

// GET /about
router.get('/', function(req, res) {
  res.render('about', { title: 'About' });
});

module.exports = router;
