// Purpose is to seed MongoDB with initial data of urdu definitions 
// Did I use ChatGTP to help me write this? Yes.
// I didn't want to type out all the definitions manually
// Just thought I would let you know!

// SEED SCRIPT FOR URDU DEFINITIONS
require('dotenv').config();
const mongoose = require('mongoose');
const Definition = require('../models/Definition');

// sample data to insert
const seedData = [
  { english: "Hello", romanUrdu: "Salaam", urduScript: "سلام", example: "Hello, how are you?" },
  { english: "Goodbye", romanUrdu: "Khuda Hafiz", urduScript: "خداحافظ", example: "" },
  { english: "Yes", romanUrdu: "Haan", urduScript: "ہاں", example: "" },
  { english: "No", romanUrdu: "Nahin", urduScript: "نہیں", example: "" },
  { english: "Thank you", romanUrdu: "Shukriya", urduScript: "شکریہ", example: "" },
  { english: "Please", romanUrdu: "Barah-e-Meherbani", urduScript: "براہِ مہربانی", example: "" },
  { english: "Friend", romanUrdu: "Dost", urduScript: "دوست", example: "He is my friend." },
  { english: "Book", romanUrdu: "Kitaab", urduScript: "کتاب", example: "" },
  { english: "Water", romanUrdu: "Paani", urduScript: "پانی", example: "" },
  { english: "Beautiful", romanUrdu: "Khoobsurat", urduScript: "خوبصورت", example: "" },
  { english: "Teacher", romanUrdu: "Ustaad", urduScript: "استاد", example: "" },
  { english: "Student", romanUrdu: "Taalib-e-Ilm", urduScript: "طالب علم", example: "" },
  { english: "Mother", romanUrdu: "Maan", urduScript: "ماں", example: "" },
  { english: "Father", romanUrdu: "Baap", urduScript: "باپ", example: "" },
  { english: "Sister", romanUrdu: "Behen", urduScript: "بہن", example: "" },
  { english: "Brother", romanUrdu: "Bhai", urduScript: "بھائی", example: "" },
  { english: "House", romanUrdu: "Ghar", urduScript: "گھر", example: "" },
  { english: "Door", romanUrdu: "Darwaza", urduScript: "دروازہ", example: "" },
  { english: "Window", romanUrdu: "Khidki", urduScript: "کھڑکی", example: "" },
  { english: "Food", romanUrdu: "Khaana", urduScript: "کھانا", example: "" },
  { english: "Milk", romanUrdu: "Doodh", urduScript: "دودھ", example: "" },
  { english: "Tea", romanUrdu: "Chai", urduScript: "چائے", example: "" },
  { english: "Bread", romanUrdu: "Roti", urduScript: "روٹی", example: "" },
  { english: "Rice", romanUrdu: "Chaawal", urduScript: "چاول", example: "" },
  { english: "Dog", romanUrdu: "Kutta", urduScript: "کتا", example: "" },
  { english: "Cat", romanUrdu: "Billi", urduScript: "بلی", example: "" },
  { english: "Bird", romanUrdu: "Parinda", urduScript: "پرندہ", example: "" },
  { english: "Sun", romanUrdu: "Sooraj", urduScript: "سورج", example: "" },
  { english: "Moon", romanUrdu: "Chaand", urduScript: "چاند", example: "" },
  { english: "Star", romanUrdu: "Sitara", urduScript: "ستارہ", example: "" },
  { english: "Red", romanUrdu: "Laal", urduScript: "لال", example: "" },
  { english: "Green", romanUrdu: "Sabz", urduScript: "سبز", example: "" },
  { english: "White", romanUrdu: "Safed", urduScript: "سفید", example: "" },
  { english: "Black", romanUrdu: "Kaala", urduScript: "کالا", example: "" },
  { english: "Big", romanUrdu: "Bara", urduScript: "بڑا", example: "" },
  { english: "Small", romanUrdu: "Chhota", urduScript: "چھوٹا", example: "" },
  { english: "Happy", romanUrdu: "Khush", urduScript: "خوش", example: "" },
  { english: "Sad", romanUrdu: "Udaas", urduScript: "اداس", example: "" },
  { english: "Hot", romanUrdu: "Garam", urduScript: "گرم", example: "" },
  { english: "Cold", romanUrdu: "Thanda", urduScript: "ٹھنڈا", example: "" },
  { english: "Come", romanUrdu: "Aao", urduScript: "آؤ", example: "" },
  { english: "Go", romanUrdu: "Jao", urduScript: "جاؤ", example: "" },
  { english: "Sit", romanUrdu: "Baitho", urduScript: "بیٹھو", example: "" },
  { english: "Stand", romanUrdu: "Khare Ho Jao", urduScript: "کھڑے ہو جاؤ", example: "" },
  { english: "Look", romanUrdu: "Dekho", urduScript: "دیکھو", example: "" },
  { english: "Write", romanUrdu: "Likho", urduScript: "لکھو", example: "" },
  { english: "Read", romanUrdu: "Parho", urduScript: "پڑھو", example: "" },
  { english: "Speak", romanUrdu: "Bolo", urduScript: "بولو", example: "" },
  { english: "Listen", romanUrdu: "Sunno", urduScript: "سنّو", example: "" },
  { english: "Walk", romanUrdu: "Chalo", urduScript: "چلو", example: "" },
  { english: "Run", romanUrdu: "Douro", urduScript: "دوڑو", example: "" }
];

// --- connect and insert ---
async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Clearing old data...");
    await Definition.deleteMany({});

    console.log("Inserting new seed data...");
    await Definition.insertMany(seedData);

    console.log("🌱 Seed complete!");
    process.exit(0);

  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
