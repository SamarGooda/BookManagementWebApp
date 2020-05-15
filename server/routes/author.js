const express = require("express");
const multer = require("multer");
const path = require("path");

const authorModel = require("../models/Author");
const booksModel = require("../models/Book");
const upload = multer({ dest: "tmp/" });

const { promisify } = require("util");
const fs = require("fs");
const mv = promisify(fs.rename);

const router = express.Router();

// ==========================================================================

router.get("/data", async (request, response) => {
  try {
    const authors = await authorModel
      .find({})
      .sort({ first_name: 1, last_name: 1 });
    response.json(authors);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

router.get("/data/:id", async (request, response) => {
  try {
    const author = await authorModel.findById(request.params.id);
    response.json(author);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

router.get("/data/:id/books", async (request, response) => {
  try {
    console.log(request.params.id);

    const books = await booksModel.find({ author: request.params.id });
    response.json(books);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

// ==========================================================================

router.post("/data", upload.single("image"), async (request, response) => {
  const { f, l, dob } = request.body;
  console.log("request.body: ", request.body);
  console.log("request.file: ", request.file);

  const new_author = new authorModel({
    first_name: f,
    last_name: l,
    date_of_birth: dob,
    image: "/images/authors/" + request.file.filename,
  });

  try {
    const saved_author = await new_author.save();
    await mv(
      __dirname + "/../" + "tmp/" + request.file.filename,
      __dirname + "/../" + "public/authors/" + request.file.filename + ".png"
    );
    response.json(saved_author);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

// ==========================================================================

router.patch("/data/:id", async (request, response) => {
  const { f, l, dob, i } = request.body;

  try {
    const author = await authorModel.findById(request.params.id);
    if (author) {
      if (f) author.first_name = f;
      if (l) author.last_name = l;
      if (dob) author.date_of_birth = dob;
      if (i) author.image = i;

      const saved_author = await author.save();
      response.json(saved_author);
    } else {
      response.status(400).send();
    }
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

// ==========================================================================

router.delete("/data/:id", async (request, response) => {
  try {
    const author = await authorModel.findById(request.params.id);
    const deleted_author = await author.remove();
    response.json(deleted_author);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});
// ==========================================================================

router.get("/", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/authors/html/authors.html"));
});

router.get("/:id", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/authors/html/author.html"));
});

router.get("/stylesheets/authors.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/authors/stylesheets/authors.css"));
});

router.get("/stylesheets/author.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/authors/stylesheets/author.css"));
});

router.get("/javascript/authors.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/authors/javascript/authors.js"));
});

router.get("/javascript/author.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/authors/javascript/author.js"));
});

module.exports = router;
