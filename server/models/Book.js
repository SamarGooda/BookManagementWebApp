const mongoose = require("mongoose");

const dbHelpers = require("../helpers/db_helpers");

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

// schema.pre("deleteMany", async function (next) {
//   console.log("Book -> delete many called !!!!");
//   console.log("this: ", this);
//   const books = await this.exec();
//   console.log("books: ", books);
// });

schema.pre("remove", { document: true }, async function (next) {
  console.log("Book -> pre remove called !!!!");

  await mongoose
    .model(dbHelpers.BOOKS_RATES_DOC_NAME)
    .find({ book: this._id })
    .deleteMany();

  await mongoose
    .model(dbHelpers.BOOKS_REVIEWS_DOC_NAME)
    .find({ book: this._id })
    .deleteMany();

  let imgFileName = this.image.split("/")[3];
  console.log("imgFileName: ", imgFileName);

  await rm(__dirname + "/../" + "public/books/" + imgFileName + ".png");

  next();
});

const Book = mongoose.model(dbHelpers.BOOKS_DOC_NAME, schema);
module.exports = Book;
