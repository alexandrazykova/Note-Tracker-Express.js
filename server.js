// Import express package
const express = require('express');
// Import built-in Node.js package 'path'
const path = require('path');

const PORT = 3001;
const app = express();

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// Parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));


// GET Route for home page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);



app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});