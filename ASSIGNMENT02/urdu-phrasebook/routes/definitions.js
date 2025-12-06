const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Definition = require('../models/Definition');

// ========================================
// GET /definitions  -> List all definitions
// ========================================
router.get('/', async (req, res) => {
  try {
    const definitions = await Definition.find().sort({ english: 1 });
    res.render('definitions/index', { definitions });
  } catch (err) {
    res.status(500).send('Error fetching definitions');
  }
});

// ========================================
// GET /definitions/add  -> Show Add Form
// ========================================
router.get('/add', (req, res) => {
  res.render('definitions/add', { errors: [], data: {} });
});

// ========================================
// POST /definitions/add  -> Create Definition (with validation)
// ========================================
router.post(
  '/add',

  // ---- express-validator checks ----
  body('english')
    .trim()
    .notEmpty()
    .withMessage('English term is required.'),

  body('urdu')
    .trim()
    .notEmpty()
    .withMessage('Urdu definition is required.'),

  body('example')
    .trim()
    .optional(),

  async (req, res) => {
    const errors = validationResult(req);

    const data = {
      english: req.body.english,
      urdu: req.body.urdu,
      example: req.body.example
    };

    // If validation fails, re-render form with errors
    if (!errors.isEmpty()) {
      return res.render('definitions/add', {
        errors: errors.array(),
        data
      });
    }

    try {
      await Definition.create(data);
      res.redirect('/definitions');
    } catch (err) {
      res.status(500).send('Error saving definition');
    }
  }
);

module.exports = router;