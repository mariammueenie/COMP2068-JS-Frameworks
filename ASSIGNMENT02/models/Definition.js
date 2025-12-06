// models/Phrase.js
const mongoose = require('mongoose');

const phraseSchema = new mongoose.Schema({
  english: {
    type: String,
    required: [true, 'English definition is required'],
    trim: true,
    minlength: [1, 'English definition cannot be empty'],
    maxlength: [120, 'English definition can only be 120 characters']
  }, 
  romanUrdu: {
    type: String,
    required: [true, 'Romanized is required'],
    trim: true,
    minlength: [1, 'Romanized section cannot be empty'],
    maxlength: [120, 'Romanized section must be at most 120 characters']
  },
  urduScript: {
    type: String,
    trim: true,
    maxlength: [120, 'Urdu text can only be 120 characters']
  },
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Definition', phraseSchema);
