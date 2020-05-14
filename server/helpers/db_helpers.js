const mongoose = require("mongoose");

const USERS_DOC_NAME = "User";
const ADMIN_DOC_NAME = "Admin";
const CATEGORIES_DOC_NAME = "Category";
const AUTHORS_DOC_NAME = "Author";
const BOOKS_DOC_NAME = "Book";
const BOOKS_SHELVES_DOC_NAME = "Book_Shelves";
const BOOKS_REVIEWS_DOC_NAME = "Books_Reviews";
const BOOKS_RATES_DOC_NAME = "Books_Rates";

const nameValidation = {
  type: String,
  required: true,
};

const dateValidation = {
  type: Date,
  required: true,
};

const imageValidation = {
  type: String,
  required: true,
};

const passwordValidation = {
  type: String,
  required: true,
  minlength: 8,
};

const emailValidation = {
  type: String,
  required: true,
  match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  unique: true,
  index: true,
};

const bookTitleValidation = {
  type: String,
  required: true,
};

const bookAuthorValidation = {
  type: mongoose.Schema.Types.ObjectId,
  ref: AUTHORS_DOC_NAME,
  required: true,
};

const categoryValidation = {
  type: mongoose.Schema.Types.ObjectId,
  ref: CATEGORIES_DOC_NAME,
  required: true,
};
const categoryNameValidation = {
  type: String,
  required: true,
  unique: true,
};

const reviewTextValidation = {
  type: String,
  required: true,
};

const userValidation = {
  type: mongoose.Schema.Types.ObjectId,
  ref: USERS_DOC_NAME,
  required: true,
};

const bookValidation = {
  type: mongoose.Schema.Types.ObjectId,
  ref: BOOKS_DOC_NAME,
  required: true,
};

const shelveTypeValidation = {
  type: String,
  enum: ["none", "read", "current", "want"],
  default: "none",
  required: true,
};

const rateValueValidation = {
  type: Number,
  min: 1,
  max: 5,
  default: 0,
};

const bookReviewValidation = {
  type: mongoose.Schema.Types.ObjectId,
  ref: BOOKS_REVIEWS_DOC_NAME,
};

const bookRateValidation = {
  type: mongoose.Schema.Types.ObjectId,
  ref: BOOKS_RATES_DOC_NAME,
};

module.exports = {
  nameValidation: nameValidation,
  dateValidation: dateValidation,
  imageValidation: imageValidation,
  passwordValidation: passwordValidation,
  emailValidation: emailValidation,
  bookTitleValidation: bookTitleValidation,
  bookAuthorValidation: bookAuthorValidation,
  categoryValidation: categoryValidation,
  categoryNameValidation: categoryNameValidation,
  reviewTextValidation: reviewTextValidation,
  userValidation: userValidation,
  bookValidation: bookValidation,
  shelveTypeValidation: shelveTypeValidation,
  rateValueValidation: rateValueValidation,
  bookReviewValidation: bookReviewValidation,
  bookRateValidation: bookRateValidation,

  USERS_DOC_NAME: USERS_DOC_NAME,
  ADMIN_DOC_NAME: ADMIN_DOC_NAME,
  CATEGORIES_DOC_NAME: CATEGORIES_DOC_NAME,
  AUTHORS_DOC_NAME: AUTHORS_DOC_NAME,
  BOOKS_DOC_NAME: BOOKS_DOC_NAME,
  BOOKS_SHELVES_DOC_NAME: BOOKS_SHELVES_DOC_NAME,
  BOOKS_REVIEWS_DOC_NAME: BOOKS_REVIEWS_DOC_NAME,
  BOOKS_RATES_DOC_NAME: BOOKS_RATES_DOC_NAME,
};
