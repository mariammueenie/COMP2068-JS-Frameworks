// route handlers for /projects section 

const express = require('express');
const router = express.Router();

// TODO: Implement CRUD operations for projects


// Note: these paths are relative to projects configured on app.js
// GET /projects - List all projects

router.get('/', (req, res, next) => {
    // Render the project list view (./views/projects/index.hbs)
    res.render("VIEWNAME" , { title: "Project List"});
});




// Export the router
module.exports = router;