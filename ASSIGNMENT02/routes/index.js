// routes/index.js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Urdu Phrasebook',
    currentUser: req.session.user || null
  });
});

module.exports = router;
// This allows for slightly different views for
// logged-in vs. not-logged-in users.
