// Import express package
const express = require('express');
// Import built-in Node.js package 'path'
const path = require('path');
// Helper method for generating unique ids
const { v4: uuidv4 } = require('uuid');
const uuid = require('./helpers/uuid');


const notes = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for home page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for api/notes
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'));
  });

// POST request for api/notes
app.post('/api/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body;
    newNote.id = uuid();
    note.push(newNote);
    const noteString = JSON.stringify(note);

    fs.writeFile('./db/db.json', noteString, err => {
      if (err) throw err;
      res.json(note);
    });
  });

// GET request for other 
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});