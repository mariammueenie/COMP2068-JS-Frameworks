// routes/users.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// =======================
// GET /users/register
// Show registration form
// =======================
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// =======================
// POST /users/register
// Create a new user
// =======================
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Very basic validation
    if (!username || !password) {
      return res.render('register', {
        error: 'Username and password are required.'
      });
    }

    // Check if user exists
    const existing = await User.findOne({ username });
    if (existing) {
      return res.render('register', {
        error: 'That username is already taken.'
      });
    }

    // Create user (password hashing handled by pre-save hook)
    const user = new User({
      username,
      password,
      role: role === 'admin' ? 'admin' : 'user' // lock this down in prod
    });

    await user.save();

    // Log them in right away
    req.session.user = {
      _id: user._id,
      username: user.username,
      role: user.role
    };

    res.redirect('/definitions');
  } catch (err) {
    console.error(err);
    res.render('register', {
      error: 'Error creating user. Please try again.'
    });
  }
});

// =======================
// GET /users/login
// Show login form
// =======================
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// =======================
// POST /users/login
// Verify credentials
// =======================
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.render('login', {
        error: 'Invalid username or password.'
      });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.render('login', {
        error: 'Invalid username or password.'
      });
    }

    // Save user in session
    req.session.user = {
      _id: user._id,
      username: user.username,
      role: user.role
    };

    res.redirect('/definitions');
  } catch (err) {
    console.error(err);
    res.render('login', {
      error: 'Error logging in. Please try again.'
    });
  }
});

// =======================
// GET /users/logout
// Destroy session
// =======================
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
