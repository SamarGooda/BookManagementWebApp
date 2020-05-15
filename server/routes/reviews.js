const express = require("express");
var path = require("path");
const router = express.Router();

const models = require("../models/models");

// ==========================================================================

router.get("/", async (request, response) => {
  try {
    const reviews = await models.review.find({}).populate("user");
    response.json(reviews);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

router.get("/:id", async (request, response) => {
  try {
    const review = await models.review
      .findById(request.params.id)
      .populate("user");
    response.json(review);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

// ==========================================================================

router.post("/", async (request, response) => {
  const { r, u, b } = request.body;
  console.log("request.body: ", request.body);

  try {
    if (!u || !r || !b) {
      return response.status(400).send();
    }

    const book = await models.book.findById(b);
    console.log("book", book);

    const user = await models.user.findById(u);
    console.log("book", book);

    if (!book || !user) {
      return response.status(400).send();
    }

    const new_review = new models.review({
      review: r,
      user: u,
      book: b,
    });

    const saved_review = await new_review.save();

    book.reviews.push(saved_review);
    const saved_book = await book.save();
    if (saved_book) response.json(saved_review);
    else response.status(400).send();
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

// ==========================================================================

router.patch("/:id", async (request, response) => {
  const { r, u, b } = request.body;
  console.log("request.body: ", request.body);

  const book = await models.book.findById(b);
  const user = await models.user.findById(u);
  if (!book || !user) {
    return response.status(400).send();
  }

  try {
    const review = await models.review.findById(request.params.id);
    if (review) {
      if (r) review.review = r;
      if (u) review.user = u;
      if (b) review.book = b;

      const saved_review = await review.save();
      response.json(saved_review);
    } else {
      response.status(400).send();
    }
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

// ==========================================================================

router.delete("/:id", async (request, response) => {
  try {
    const deleted_review = await models.review.findByIdAndDelete(
      request.params.id
    );

    if (deleted_review) {
      const book = await models.book.findById(deleted_review.book);
      book.reviews.pull(deleted_review);
      const updated_book = book.save();
      if (updated_book) {
        return response.json(deleted_review);
      }
    }

    return response.status(400).send();
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});
// ==========================================================================

module.exports = router;
