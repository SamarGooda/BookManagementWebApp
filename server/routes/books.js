const express = require('express')
const router = express.Router()
var path = require("path");
const Book = require('../models/Book')
 
  router.post('/', async(req, res,next) => {
    //  const { id } = req.params
    // res.send("creating user with id = 5")
    const  { title,image,author,category } = req.body
    const books = new Book({ title,image,author,category })
    try {
        const book_data = await books.save()
        return res.json(book_data)
    } catch (err) {
        next(err)
    }
  })

  router.get('/data', async(req, res, next) => {
    try {
        const books = await Book.find({}).populate('author.first_name');
        // .populate('category')
     
 
        return res.json(books)
    } catch (err) {
        next(err)
    }
  })
  
  
  router.get('/:id', async(req, res,next) => {
    try {
        const book_data = await Book.findById(req.params.id)
        return res.json(book_data)
    } catch (err) {
      next(err)
    }
  
  })
  

  router.delete('/:id', async(req, res, next) => {
    try {
        const book_data = await Book.findByIdAndRemove(req.params.id)
        return res.json(book_data)
    } catch (err) {
        next(err)
    }
  })


  router.patch('/:id', async(req, res,next) => {
    const { body: { title,image,author,category } } = req
    try {
        const book_data = await Book.findByIdAndUpdate(req.params.id, { title,image,author,category })
        return res.json(book_data)
    } catch (err) {
         next(err)
    }
  })

  

  // router.get("/", async (request, response) => {});

router.get("/javascript/books.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/javascript/books.js"));
});

router.get("/stylecheets/books.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/stylecheets/books.css"));
  
});

router.get("/", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/html/books/books.html"));
});








module.exports = router