// models/Definition.js
const mongoose = require('mongoose');

const definitionSchema = new mongoose.Schema({
  // English meaning / definition
  english: {
    type: String,
    required: [true, 'English definition is required'],
    trim: true,
    minlength: [1, 'English definition cannot be empty'],
    maxlength: [120, 'English definition can only be 120 characters']
  },

 // Romanized Urdu
romanUrdu: {
  type: String,
  trim: true,
  maxlength: [120, 'Romanized Urdu can only be 120 characters']
},

// Urdu script as separate field
urduScript: {
  type: String,
  trim: true,
  maxlength: [120, 'Urdu script can only be 120 characters']
},


  // Optional example sentence
  example: {
    type: String,
    trim: true,
    maxlength: [250, 'Example must be at most 250 characters']
  },

  // Approval status: user adds => "pending", admin changes => "approved"
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  },

  // Which user submitted this definition
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Definition', definitionSchema);
