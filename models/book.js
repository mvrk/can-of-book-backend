//Declare schema, head to table

'use strict';

//bring in mongoose--------------------
const mongoose = require('mongoose');

// extract the Schema property from the mongoose object----------
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: Boolean, required: true}
});


//define our model
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;

