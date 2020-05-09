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
        const books = await Book.find({}).populate('author');
        // .populate('category')
     
              
        return res.json(books)
    } catch (err) {
        next(err)
    }
  })
  
  
  router.get('/data/:id', async(req, res,next) => {
    try {
      
        const book_data = await Book.findById(req.params.id).populate('author').populate('category');
        if (book_data) 
         {
          return res.json(book_data)
         }
         else
         {
          return res.status(404).send();
         }
       
        
    } catch (err) {
      console.log("errrrrr:",err)
      next(err)
    }
  
  })
  

  router.delete('/data/:id', async(req, res, next) => {
    try {
        const book_data = await Book.findByIdAndRemove(req.params.id)
        return res.json(book_data)
    } catch (err) {
        next(err)
    }
  })


  router.patch('/data/:id', async(req, res,next) => {
    const { body: { title,image,author,category } } = req
    try {
        const book_data = await Book.findByIdAndUpdate(req.params.id, { title,image,author,category })
        return res.json(book_data)
    } catch (err) {
         next(err)
    }
  })

  
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// routes for books_page

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


///////////////////////////////////////////////////////////////////////////////////////////////

//routes for book_details
router.get("/:id", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/html/books/book_data.html"));
});

router.get("/stylecheets/book_data.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/stylecheets/book_data.css"));
  
});

router.get("/javascript/book_data.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/javascript/book_data.js"));
  
});




module.exports = router