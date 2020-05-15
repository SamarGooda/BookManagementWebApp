const mongoose = require("mongoose");

const dbHelpers = require("../helpers/db_helpers");

// const models = require("./models");
// const authorModel = require("./models").author;
// const categoryModel = require("./models").category;

// const categoryModel = require("./Category");
// const ratesModel = require("./book_rate");
// const reviewsModel = require("./book_review");

// const authorModel = require("./Author");

const { promisify } = require("util");
const fs = require("fs");
const rm = promisify(fs.unlink);

const schema = new mongoose.Schema(
  {
    title: dbHelpers.bookTitleValidation,
    image: dbHelpers.imageValidation,
    author: dbHelpers.bookAuthorValidation,
    category: dbHelpers.categoryValidation,
    reviews: [dbHelpers.bookReviewValidation],
    rates: [dbHelpers.bookRateValidation],
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  const author = await mongoose
    .model(dbHelpers.AUTHORS_DOC_NAME)
    .findById(this.author);
  if (!author) {
    next(new Error("Author is not valid!"));
  }

  const category = await mongoose
    .model(dbHelpers.CATEGORIES_DOC_NAME)
    .findById(this.category);
  if (!category) {
    next(new Error("Category is not valid!"));
  }

  next();
});

schema.pre("remove", { document: true }, async function (next) {
  console.log("pre book remove!!!!!!!!");

  await models.rate.find({ book: this.book }).deleteMany();
  await models.review.find({ book: this.book }).deleteMany();

  let imgFileName = this.image.split("/")[3];
  console.log("imgFileName: ", imgFileName);

  await rm(__dirname + "/../" + "public/books/" + imgFileName + ".png");

  next();
});

// const Book = mongoose.model(dbHelpers.BOOKS_DOC_NAME, schema);
module.exports = schema;
