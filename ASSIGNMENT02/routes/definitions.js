// routes/definitions.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Definition = require('../models/Definition');

// ===============================
// AUTH MIDDLEWARE HELPERS
// ===============================

// Must be logged in
function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  // Not logged in -> send to login
  return res.redirect('/users/login');
}

// Must be admin
function isAdmin(req, res, next) {
  if (
    req.session &&
    req.session.user &&
    req.session.user.role === 'admin'
  ) {
    return next();
  }
  return res.status(403).send('Admins only.');
}

// ===============================
// GET /definitions/search
// Search approved definitions by English term
// ===============================
router.get('/search', async (req, res) => {
  const q = req.query.q || '';

  try {
    const results = await Definition.find({
      english: { $regex: q, $options: 'i' },
      status: 'approved' // only approved in search
    }).sort({ english: 1 });

    res.render('definitions/search', { q, results });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error searching definitions');
  }
});

// ===============================
// ADMIN DASHBOARD
// GET /definitions/pending
// List all pending definitions for approval
// ===============================
router.get('/pending', isAdmin, async (req, res) => {
  try {
    const pendingDefs = await Definition.find({ status: 'pending' })
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    res.render('definitions/pending', { definitions: pendingDefs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching pending definitions');
  }
});

// ===============================
// ADMIN APPROVE ROUTE
// POST /definitions/:id/approve
// Change status from pending -> approved
// ===============================
router.post('/:id/approve', isAdmin, async (req, res) => {
  try {
    await Definition.findByIdAndUpdate(req.params.id, {
      status: 'approved'
    });
    res.redirect('/definitions/pending');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error approving definition');
  }
});

// ===============================
// GET /definitions/edit/:id
// Show Edit Form (ADMIN ONLY)
// ===============================
router.get('/edit/:id', isAdmin, async (req, res) => {
  try {
    const definition = await Definition.findById(req.params.id);

    if (!definition) {
      return res.status(404).send('Definition not found');
    }

    res.render('definitions/edit', { definition });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading edit page');
  }
});

// ===============================
// POST /definitions/edit/:id
// Update definition (ADMIN ONLY)
// ===============================
router.post('/edit/:id', isAdmin, async (req, res) => {
  try {
    await Definition.findByIdAndUpdate(req.params.id, {
      english: req.body.english,
      urdu: req.body.urdu,
      example: req.body.example
    });

    res.redirect('/definitions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating definition');
  }
});

// ===============================
// GET /definitions/delete/:id
// Delete definition (ADMIN ONLY)
// ===============================
router.get('/delete/:id', isAdmin, async (req, res) => {
  try {
    await Definition.findByIdAndDelete(req.params.id);
    res.redirect('/definitions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting item');
  }
});

// ===============================
// GET /definitions
// List ONLY APPROVED definitions
// ===============================
router.get('/', async (req, res) => {
  try {
    const definitions = await Definition.find({ status: 'approved' })
      .sort({ english: 1 });

    res.render('definitions/index', { definitions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching definitions');
  }
});

// ===============================
// GET /definitions/add
// Show Add Form (LOGGED-IN USERS ONLY)
// ===============================
router.get('/add', isLoggedIn, (req, res) => {
  res.render('definitions/add', { errors: [], data: {} });
});

// ===============================
// POST /definitions/add
// Create Definition (LOGGED-IN USERS ONLY, status = pending)
// ===============================
router.post(
  '/add',
  isLoggedIn,

  // express-validator checks
  body('english')
    .trim()
    .notEmpty()
    .withMessage('English term is required.'),

  body('urdu')
    .trim()
    .notEmpty()
    .withMessage('Urdu definition is required.'),

  body('example').trim().optional(),

  async (req, res) => {
    const errors = validationResult(req);

    const data = {
      english: req.body.english,
      urdu: req.body.urdu,
      example: req.body.example
    };

    if (!errors.isEmpty()) {
      return res.render('definitions/add', {
        errors: errors.array(),
        data
      });
    }

    try {
      // If admin adds it, you *could* auto-approve it.
      const status =
        req.session.user && req.session.user.role === 'admin'
          ? 'approved'
          : 'pending';

      await Definition.create({
        ...data,
        status,
        createdBy: req.session.user
          ? req.session.user._id
          : null
      });

      // After submission, send them to list (or maybe "thank you" page)
      res.redirect('/definitions');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving definition');
    }
  }
);

module.exports = router;
