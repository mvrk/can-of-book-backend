const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Book = require('./models/book');

const PORT = process.env.PORT;

const app = express();

app.use(cors());

mongoose.connect(process.env.DATABASE_URL);

app.get('/books', async (request, response) => {

  const filterQuery = {};

  if (request.query.location) {
    filterQuery.location = request.query.location;
  }

  const books = await Book.find(filterQuery);

  response.send(books);
});

app.listen(PORT, () => console.log('Listening on PORT', PORT));


