/*
/**
 * 
 *  
    Name: Jose Uribe
    Student's id: 301236090
    Date: June 25, 2022
 */
 

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {title: 'New Book', page: 'books/details', books: ''});
  
    /*****************
     * ADD CODE HERE *
     *****************/

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let mybook = new books ({
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre,
    });

    books.create(mybook, (err)=> {
      if(err) {
        console.error(err);
        res.end(err);
      };
      res.redirect('/books');
    })

});

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    books.findById(req.params.id, (err, book) => {
      if(err) {
        console.error(err);
        res.end(err);
      }
      res.render('books/details', {title: 'Edit Book', page: 'books/details', books: book});
    }
    )


});

// POST - process the information passed from the details form and update the document
// Edited route   
router.post('/details/:id', (req, res, next) => {


    /*****************
     * ADD CODE HERE *
     *****************/

     let id = req.params.id;
    let item = new books({
        "_id": id,
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    books.updateOne({ _id: id }, item, {}, (err) => {
        if (err) {
            console.error(err);
            res.redirect('/books');
         res.end(err);
        }

        res.redirect('/books');
    })
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {


    /*****************
     * ADD CODE HERE *
     *****************/

    books.findByIdAndRemove(req.params.id, (err, book) => {
      if(err) {
        console.error(err);
        res.end(err);
      }
      res.redirect('/books');
    } ) 
});


module.exports = router;
