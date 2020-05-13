const express = require("express");
const router = express.Router();
var path = require("path");
const Book = require('../models/Book')
const Rate = require('../models/book_rate')

router.post('/', async (req, res, next) => {
  //  const { id } = req.params
  // res.send("creating user with id = 5")
  const { title, image, author, category } = req.body
  const books = new Book({ title, image, author, category })
  try {
    const book_data = await books.save()
    return res.json(book_data)
  } catch (err) {
    next(err)
  }
})

router.get('/data', async (req, res, next) => {
  try {
    const books = await Book.find({}).populate('author').populate({
      path: 'reviews',
      populate: {
        path: 'user'
      }
    })
    // .populate('category')


    return res.json(books)
  } catch (err) {
    next(err)
  }
})


router.get('/data/:id', async (req, res, next) => {
  try {

    const book_data = await Book.findById(req.params.id).populate('author').populate({
      path: 'reviews',
      populate: {
        path: 'user'
      }
    })


    // populate('category');

    if (book_data) {
      return res.json(book_data)
    }
    else {
      return res.status(404).send();
    }


  } catch (err) {
    console.log("errrrrr:", err)
    next(err)
  }

})
///////////////////////////////////////////////////////////////////////////////////////

// rate for book
router.get("/avg/:id", async (request, response) => {

  try {
    const book_data = await Book.findById(request.params.id)
    if(! book_data){
      return response.status(404).send();
    }
    const query = { book: request.params.id };
    const book_rates = await Rate.find(query)
    let sum = 0
    for (i=0; i< book_rates.length ; i++)
    {
      
      sum += book_rates[i].rate 
    }
    const avg_rate =  sum / book_rates.length
    console.log(book_rates)
    response.json(avg_rate);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/data/:id', async (req, res, next) => {
  try {
    const book_data = await Book.findByIdAndRemove({})
    // const book_data = await Book.findByIdAndDelete(
    //   request.params.id
    // );
    return res.json(book_data)

  } catch (err) {
    next(err)
  }
})

// router.delete('/data', async(req, res, next) => {
//   try {
//       const book_data = await Book.findAndRemove(req.params.id)
//       // const book_data = await Book.findByIdAndDelete(
//       //   request.params.id
//       // );
//       return res.json(book_data)

//   } catch (err) {
//       next(err)
//   }
// })


router.patch("/data/:id", async (req, res, next) => {
  const { title, image, author, category } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      if (title) book.title = title;
      if (author) book.author = author;
      if (category) book.category = category;
      if (image) book.image = image;

      const saved_book = await book.save();
      res.json(saved_book);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

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

module.exports = router;
