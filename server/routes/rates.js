const express = require("express");
var path = require("path");
const router = express.Router();
const ratesModel = require("../models/book_rate");
const booksModel = require("../models/Book");
const usersModel = require("../models/User");
const { getUserId } = require("../helpers/general_helpers");

// ==========================================================================

router.get("/", async (request, response) => {
  try {
    const rates = await ratesModel.find({});
    response.json(rates);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

router.get("/:id", async (request, response) => {
  try {
    const rate = await ratesModel.findById(request.params.id);
    response.json(rate);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});


// ==========================================================================

router.post("/", auth, async (request, response) => {
  const u = getUserId(request.cookies.user_token);
  const { r, b } = request.body;
  const book = await booksModel.findById(b);
  const user = await usersModel.findById(u);
  if (!book || !user) {
    return response.status(400).send();
  }

  const new_rate = new ratesModel({
    rate: r,
    user: u,
    book: b,
  });

  try {
    const saved_rate = await new_rate.save();
    response.json(saved_rate);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

// ==========================================================================

router.patch("/:id", async (request, response) => {
  const { r, u, b } = request.body;
  console.log("request.body: ", request.body);

  const book = await booksModel.findById(b);
  const user = await usersModel.findById(u);
  if (!book || !user) {
    return response.status(400).send();
  }

  try {
    const rate = await ratesModel.findById(request.params.id);
    if (rate) {
      if (r) rate.rate = r;
      if (u) rate.user = u;
      if (b) rate.book = b;

      const saved_rate = await rate.save();
      response.json(saved_rate);
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
    console.log("I am here");

    const deleted_rate = await ratesModel.findByIdAndDelete(
      request.params.id
    );
    response.json(deleted_rate);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});
// ==========================================================================

module.exports = router;
