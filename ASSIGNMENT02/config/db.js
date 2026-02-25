// config/db.js
const mongoose = require('mongoose');

function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MONGODB_URI not set in environment variables');
    process.exit(1);
  }

  mongoose.connect(uri)
    .then(() => {
      console.log('MongoDB connected');

      // DEBUG: confirm EXACT DB + host this deployment is using
      console.log('DB NAME:', mongoose.connection.name);
      console.log('DB HOST:', mongoose.connection.host);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}

module.exports = connectDB;