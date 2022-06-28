//require and dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// bring in mongoose
const mongoose = require('mongoose');

// bring in a scheme if I want to interact with that model
const Book = require('./models/book.js');

// connect Mongoose to ouur MongoDB
mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


// USE
// implement express
const app = express();

// middleware
app.use(cors());

// define PORT validate env is working
const PORT = process.env.PORT || 3008;

// test ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

// ROUTES
app.get('/books', async (request, response) => {

  const filterQuery = {};

  if (request.query.location) {
    filterQuery.location = request.query.location;
  }

  const books = await Book.find(filterQuery);

  response.send(books);
});

app.listen(PORT, () => console.log('Listening on PORT', PORT));

//wrong get
app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));


