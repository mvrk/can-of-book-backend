'use strict';

//require and dependencies
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Book = require('./models/book');

async function seed() {
  
  // seed the database with some cats, so I can retrieve them
  // const myBook = new Book({
  //   title: 'Zero to One',
  //   description: 'Notes on startups, or how to build the future',
  //   status: false
  // });
  // myBook.save(function (err) {
  //   if (err) console.error(err);
  //   // else console.log('Zero to One');
  // });

  // alternately...
  await Book.create({
    title: 'The 10X Rule',
    description: 'The only difference between success and failure',
    status: true
  });
  console.log('The 10X Rule');

  await Book.create({
    title: 'Advanced Linux Networking',
    description: 'This book introduces basic network configuration of local network servers, internet servers, network security and router functions.',
    status: true
  });
  console.log('Advanced Linux Networking');

  await Book.create({
    title: 'Eloquent JavaScript',
    description: 'A modern introduction to programming',
    status: true
  });
  console.log('Eloquent JavaScript');

  mongoose.disconnect();
}

seed();
