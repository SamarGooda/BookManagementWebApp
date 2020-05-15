const express = require("express");
const router = express.Router();
const categoriesModel = require("../models/Category");
const booksModel = require("../models/Book");

const path = require("path");

// ---------------------------------------------------------

router.get("/data", async (req, res) => {
  try {
    const allCategories = await categoriesModel.find({}).sort({ name: 1 });
    res.json(allCategories);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.post("/data", async (req, res) => {
  console.log("req.body: ", req.body);
  const { n } = req.body;
  try {
    if (!n) {
      return res.status(400).send();
    }

    const new_category = new categoriesModel({
      name: n,
    });

    const saved_category = await new_category.save();
    if (saved_category) res.json(saved_category);
    else res.status(400).send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.get("/data/:id", async (req, res) => {
  try {
    const category = await categoriesModel.findById(req.params.id);
    if (category) res.json(category);
    else res.status(400).send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.patch("/data/:id", async (req, res) => {
  console.log("req.body: ", req.body);

  const { n } = req.body;

  try {
    const category = await categoriesModel.findById(req.params.id);
    if (category) {
      if (n) category.name = n;
      const saved_category = await category.save();
      if (saved_category) res.json(saved_category);
      else res.status(400).send();
    } else {
      res.status(400).send();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.delete("/data/:id", async (req, res) => {
  try {
    const category = await categoriesModel.findById(req.params.id);
    const deleted_category = await category.remove();
    if (deleted_category) res.json(deleted_category);
    else res.status(400).send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.get("/data/:id/books", async (request, response) => {
  try {
    console.log(request.params.id);

    const books = await booksModel.find({ category: request.params.id });
    response.json(books);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});
// ---------------------------------------------------------

router.get("/", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/categories/html/categories.html"));
});

router.get("/:id", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/categories/html/category.html"));
});

router.get("/stylesheets/categories.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(
    path.resolve("../client/_site/categories/stylesheets/categories.css")
  );
});

router.get("/stylesheets/category.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(
    path.resolve("../client/_site/categories/stylesheets/category.css")
  );
});

router.get("/javascript/categories.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(
    path.resolve("../client/_site/categories/javascript/categories.js")
  );
});

router.get("/javascript/category.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(
    path.resolve("../client/_site/categories/javascript/category.js")
  );
});

module.exports = router;
