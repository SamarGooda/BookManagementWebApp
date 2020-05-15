const express = require("express");
var path = require("path");
const router = express.Router();

const models = require("../models/models");

// ==========================================================================

router.get("/", async (request, response) => {
  try {
    const rates = await models.rate.find({});
    response.json(rates);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

router.get("/:id", async (request, response) => {
  try {
    const rate = await models.rate.findById(request.params.id);
    response.json(rate);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

// ==========================================================================

router.post("/", async (request, response) => {
  const { r, u, b } = request.body;
  console.log("request.body: ", request.body);

  const book = await models.book.findById(b);
  const user = await models.user.findById(u);
  if (!book || !user) {
    return response.status(400).send();
  }

  const new_rate = new models.rate({
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

  const book = await models.book.findById(b);
  const user = await models.user.findById(u);
  if (!book || !user) {
    return response.status(400).send();
  }

  try {
    const rate = await models.rate.findById(request.params.id);
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

    const deleted_rate = await models.rate.findByIdAndDelete(request.params.id);
    response.json(deleted_rate);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});
// ==========================================================================

module.exports = router;
