// Import express package
const express = require('express');
// Import built-in Node.js package 'path'
const path = require('path');

const notes = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());

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
    res.json(notes)
});

// POST request for api/notes
app.post('/api/notes', (req, res) => {
    notes.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
        if (err) {
            console.error(err);
        }
    });
    res.send(notes)
});

// GET request for other 
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});