# Urdu Phrasebook — Assignment 02 (COMP2068 JS Frameworks)

**Live site:** https://comp2068-assignment-02-urdu-phrasebook.onrender.com/definitions

## Admin Login (For Instructor / Grading)

This application includes an administrator account used for approving user-submitted definitions and managing content.

**Admin Credentials**

| Role    | Username     | Password         |
|---------|--------------|------------------|
| Admin   | adminDemo    | Admin123!        |

These credentials are used to access:

- **Admin-only Edit / Delete buttons**
- **Pending Definitions Dashboard** (`/definitions/pending`)
- **Approval system for user submissions**

Regular users cannot perform administrative actions.


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
| Backend              | Node.js, Express, BCrypt      |
| Database             | MongoDB Atlas, Mongoose ODM   |
| Templating / Views   | Handlebars (HBS)              |
| CSS / UI             | Bootstrap                     |
| Deployment / Hosting | Render.com (cloud)            |
| Env / Config         | `dotenv` + `.env`             |

