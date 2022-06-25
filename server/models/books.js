/*
/**
 * 
 *  
    Name: Jose Uribe
    Student's id: 301236090
    Date: June 25, 2022
 */
  
let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
