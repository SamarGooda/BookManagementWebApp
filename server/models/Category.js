const mongoose = require("mongoose");
const dbHelpers = require("../helpers/db_helpers");

const schema = new mongoose.Schema(
  {
    name: dbHelpers.categoryNameValidation,
  },
  { timestamps: true }
);

schema.pre("remove", { document: true }, async function (next) {
  console.log("Category -> pre remove called !!!!");

  const books = await mongoose
    .model(dbHelpers.BOOKS_DOC_NAME)
    .find({ category: this._id });

  books.forEach(async (book) => {
    await book.remove();
  });

  next();
});

const Category = mongoose.model(dbHelpers.CATEGORIES_DOC_NAME, schema);
module.exports = Category;
