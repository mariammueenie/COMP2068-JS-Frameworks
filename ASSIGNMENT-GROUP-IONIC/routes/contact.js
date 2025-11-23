// routes/contact.js
// ------------------------------------------------------------
// This router handles the Contact page at /contact.
// It currently only renders a static contact form.
// Later, this route could accept POST requests as well.
// ------------------------------------------------------------
const express = require('express');
const router = express.Router();

// GET /contact
router.get('/', function(req, res) {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
