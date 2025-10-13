// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

var express = require('express');
var router = express.Router();

// Home
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// About
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

// Projects
router.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

// Contact
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;

