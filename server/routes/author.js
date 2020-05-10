const express = require("express");
const router = express.Router();
var multer = require("multer");

const authorModel = require("../models/Author");
const upload = multer({ dest: "../tmp" });

const { promisify } = require("util");
const fs = require("fs");
const mv = promisify(fs.rename);
const rm = promisify(fs.unlink);

// ==========================================================================

router.get("/", async (request, response) => {
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

router.get("/:id", async (request, response) => {
  try {
    const author = await authorModel.findById(request.params.id);
    response.json(author);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

// ==========================================================================

router.post("/", upload.single("image"), async (request, response) => {
  const { f, l, dob, i } = request.body;
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
      __dirname + "/../../" + "tmp/" + request.file.filename,
      __dirname + "/../" + "public/authors/" + request.file.filename + ".png"
    );
    response.json(saved_author);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});

// ==========================================================================

router.patch("/:id", async (request, response) => {
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

router.delete("/:id", async (request, response) => {
  try {
    console.log("I am here");

    const deleted_author = await authorModel.findByIdAndDelete(
      request.params.id
    );
    response.json(deleted_author);
  } catch (error) {
    console.log(error);
    response.status(400).send();
  }
});
// ==========================================================================

module.exports = router;
