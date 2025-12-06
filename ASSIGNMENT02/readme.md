# Urdu Phrasebook — Assignment 02 (COMP2068 JS Frameworks)

**Live site:** https://comp2068-assignment-02-urdu-phrasebook.onrender.com/definitions

## Project Overview  
**Urdu Phrasebook** is a simple CRUD web application built with Node.js, Express, MongoDB/Mongoose, and Handlebars (HBS) that allows users to store, view, search, and manage English-to-Urdu (Romanized & Script) definitions.  

It supports:

- Adding new phrases (with English, Romanized Urdu, Urdu script, optional example sentence, and optional tags)  
- Viewing all definitions (public read-only list)  
- Searching by English word  
- Editing or deleting existing definitions (protected — for logged-in/authenticated users)  
- Basic validation (field required-ness, max length, trimming)  
- Nice UI using Bootstrap  

---

## Tech Stack  
| Area                 | Tools / Libraries             |
|----------------------|-------------------------------|
| Backend              | Node.js, Express              |
| Database             | MongoDB Atlas, Mongoose ODM   |
| Templating / Views   | Handlebars (HBS)              |
| CSS / UI             | Bootstrap                     |
| Deployment / Hosting | Render.com (cloud)            |
| Env / Config         | `dotenv` + `.env`             |

