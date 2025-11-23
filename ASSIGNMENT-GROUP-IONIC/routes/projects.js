// routes/projects.js
// ------------------------------------------------------------
// This router handles the Projects page at /projects.
// It loads project data from projects.json and passes it
// into the 'projects' Handlebars view.
//
// This structure is very friendly for Ionic demos because:
// - The data lives in one place (projects.json)
// - The view can loop over the projects
// - The front-end script can filter projects by tags
// ------------------------------------------------------------
const express = require('express');
const path = require('path');
const router = express.Router();

// Load the project data from the JSON file.
// require() will parse the JSON into a JavaScript array.
const projects = require('../projects.json');

// GET /projects
router.get('/', function(req, res) {
  // Send both a title and the full list of projects
  // to the Handlebars template.
  res.render('projects', {
    title: 'Projects',
    projects
  });
});

module.exports = router;
