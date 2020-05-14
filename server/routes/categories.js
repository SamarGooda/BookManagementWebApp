const express = require("express");
const router = express.Router();
const categoriesModel = require("../models/Category");

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
    const deletedBooks = await booksModel
    .find({ category: request.params.id })
    .deleteMany();


    const deleted_category = await categoriesModel.findByIdAndDelete(
      req.params.id
    );
    if (deleted_category) res.json(deleted_category);
    else res.status(400).send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = router;
