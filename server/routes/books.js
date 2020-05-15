const express = require("express");
const path = require("path");
const Book = require("../models/Book");
const Rate = require("../models/book_rate");
const multer = require("multer");

const upload = multer({ dest: "tmp/" });
const { promisify } = require("util");
const fs = require("fs");
const mv = promisify(fs.rename);

const router = express.Router();

router.post("/data", upload.single("image"), async (request, response) => {
  const { title, author, category } = request.body;
  console.log("request.body: ", request.body);
  console.log("request.file: ", request.file);

  const new_book = new Book({
    title: title,
    author: author,
    category: category,
    image: "/images/books/" + request.file.filename,
  });

  try {
    const saved_book = await new_book.save();
    await mv(
      __dirname + "/../" + "tmp/" + request.file.filename,
      __dirname + "/../" + "public/books/" + request.file.filename + ".png"
    );
    response.json(saved_book);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

router.get("/data", async (req, res, next) => {
  try {
    const books = await Book.find({})
      .populate("author")
      .populate("category")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
        },
      });

    return res.json(books);
  } catch (err) {
    next(err);
  }
});

router.get("/data/:id", async (req, res, next) => {
  try {
    const book_data = await Book.findById(req.params.id)
      .populate("author")
      .populate("category")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
        },
      });

    // populate('category');

    if (book_data) {
      return res.json(book_data);
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    console.log("errrrrr:", err);
    next(err);
  }
});
///////////////////////////////////////////////////////////////////////////////////////

// rate for book
router.get("/avg/:id", async (request, response) => {
  try {
    const book_data = await Book.findById(request.params.id);
    if (!book_data) {
      return response.status(404).send();
    }
    const query = { book: request.params.id };
    const book_rates = await Rate.find(query);
    let sum = 0;
    for (i = 0; i < book_rates.length; i++) {
      sum += book_rates[i].rate;
    }
    const avg_rate = sum / book_rates.length;
    console.log(book_rates);
    response.json({
      avg_rate: avg_rate,
      count: book_rates.length,
    });
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////

router.delete("/data/:id", async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);
    const deleted_book = await book.remove();

    response.json(deleted_book);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

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
  res.sendFile(path.resolve("../client/_site/books/javascript/books.js"));
});

router.get("/stylesheets/books.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/books/stylesheets/books.css"));
});

router.get("/", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/books/html/books.html"));
});

///////////////////////////////////////////////////////////////////////////////////////////////

//routes for book_details
router.get("/:id", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/books/html/book_data.html"));
});

router.get("/stylesheets/book_data.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/books/stylesheets/book_data.css"));
});

router.get("/javascript/book_data.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/books/javascript/book_data.js"));
});

module.exports = router;
