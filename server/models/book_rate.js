const mongoose = require("mongoose");
const dbHelpers = require("../helpers/db_helpers");
const userModel = require("./User");
const bookModel = require("./Book");

const schema = new mongoose.Schema({
  rate: dbHelpers.rateValueValidation,
  user: dbHelpers.userValidation,
  book: dbHelpers.bookValidation,
}).index({ 'user': 1, 'book': 1 }, { unique: true });

schema.pre("save", async function (next) {
  try {
    const user = userModel.findById(this.user);
    if (!user) {
      next(new Error("User is not valid!"));
    }

    const book = bookModel.findById(this.book);
    if (!book) {
      next(new Error("Book is not valid!"));
    }
  } catch (error) {
    console.log(error);
  }

  next();
});

const User = mongoose.model(dbHelpers.BOOKS_RATES_DOC_NAME, schema);
module.exports = User;
