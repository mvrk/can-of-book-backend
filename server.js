'use strict';

//require and dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// USE
// implement express
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// bring in mongoose
const mongoose = require('mongoose');

// bring in a scheme if I want to interact with that model
const Book = require('./models/book.js');

// connect Mongoose to our MongoDB
mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


// define PORT validate env is working
const PORT = process.env.PORT || 3008;

// test ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

//call routes
app.get('/books', getBooks)
app.post('/books', postBooks)
app.delete('/books/:id', deleteBooks)

// ROUTES get books-----------------------------------------------------------
async function getBooks(req, res, next) {
  try {
    let results = await Book.find();
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

// ROUTES post books-----------------------------------------------------------

async function postBooks(req, res, next) {
  try {
    console.log(req);
    let createdBook = await Book.create(req.body);

    res.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
}


// ROUTES delete books-----------------------------------------------------------

async function deleteBooks(req, res, next) {
  let id = req.params.id;
  console.log(id);
  try {
    await Book.findByIdAndDelete(id)
    res.status(200).send('book deleted');
  } catch (error) {
    next(error);
  }
}
//-------------------------------------------------

//wrong get
app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));


