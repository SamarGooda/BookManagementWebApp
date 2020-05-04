const mongoose = require('mongoose');

const USERS_DOC_NAME = "User";
const CATEGORIES_DOC_NAME = "Category";
const AUTHORS_DOC_NAME = "Author";
const BOOKS_DOC_NAME = "Book";
const BOOKS_SHELVES_DOC_NAME = "Book_Shelves";
const BOOKS_REVIEWS_DOC_NAME = "Books_Reviews";

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
  required: true,
}

module.exports = {
  'nameValidation': nameValidation,
  'dateValidation': dateValidation,
  'imageValidation': imageValidation,
  'passwordValidation': passwordValidation,
  'emailValidation': emailValidation,
  'bookTitleValidation': bookTitleValidation,
  'bookAuthorValidation': bookAuthorValidation,
  'categoryValidation': categoryValidation,
  'categoryNameValidation': categoryNameValidation,
  'reviewTextValidation': reviewTextValidation,
  'userValidation': userValidation,
  'bookValidation': bookValidation,
  'shelveTypeValidation': shelveTypeValidation,

  'USERS_DOC_NAME': USERS_DOC_NAME,
  'CATEGORIES_DOC_NAME': CATEGORIES_DOC_NAME,
  'AUTHORS_DOC_NAME': AUTHORS_DOC_NAME,
  'BOOKS_DOC_NAME': BOOKS_DOC_NAME,
  'BOOKS_SHELVES_DOC_NAME': BOOKS_SHELVES_DOC_NAME,
  'BOOKS_REVIEWS_DOC_NAME': BOOKS_REVIEWS_DOC_NAME,
};
