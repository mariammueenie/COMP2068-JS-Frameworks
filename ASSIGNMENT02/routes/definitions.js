const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Definition = require('../models/Definition');

// ========================================
// Get /definitions/search 
// To search definitions by English term
// ========================================
// GET /definitions/search
router.get('/search', async (req, res) => {
  const q = req.query.q || "";

  try {
    const results = await Definition.find({
      english: { $regex: q, $options: "i" }
    });

    res.render('definitions/search', { q, results });

  } catch (err) {
    res.status(500).send("Error searching definitions");
  }
});

//=========================================
// GET /definitions/edit/:id -> Show Edit Form
//========================================
router.get('/edit/:id', async (req, res) => {
  try {
    const definition = await Definition.findById(req.params.id);
    res.render('definitions/edit', { definition });
  } catch (err) {
    res.status(500).send("Error loading edit page");
  }
});

//=========================================
// POST /definitions/edit/:id -> Update definition
//========================================
router.post('/edit/:id', async (req, res) => {
  try {
    await Definition.findByIdAndUpdate(req.params.id, {
      english: req.body.english,
      urdu: req.body.urdu,
      example: req.body.example
    });

    res.redirect('/definitions');

  } catch (err) {
    res.status(500).send("Error updating definition");
  }
});

//=========================================
// GET /definitions/delete/:id -> Delete definition
//=======================================
router.get('/delete/:id', async (req, res) => {
  try {
    await Definition.findByIdAndDelete(req.params.id);
    res.redirect('/definitions');
  } catch (err) {
    res.status(500).send("Error deleting item");
  }
});

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