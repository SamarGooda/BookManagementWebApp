const mongoose = require("mongoose");

const dbHelpers = require("../helpers/db_helpers");
const adminSchema = require("./admin");
const authorSchema = require("./Author");
const bookSchema = require("./Book");
const rateSchema = require("./book_rate");
const reviewSchema = require("./book_review");
const categorySchema = require("./Category");
const shelveSchema = require("./shelves");
const userSchema = require("./User");

module.exports = {
  admin: mongoose.model(dbHelpers.ADMIN_DOC_NAME, adminSchema),
  author: mongoose.model(dbHelpers.AUTHORS_DOC_NAME, authorSchema),
  book: mongoose.model(dbHelpers.BOOKS_DOC_NAME, bookSchema),
  rate: mongoose.model(dbHelpers.BOOKS_RATES_DOC_NAME, rateSchema),
  review: mongoose.model(dbHelpers.BOOKS_REVIEWS_DOC_NAME, reviewSchema),
  category: mongoose.model(dbHelpers.CATEGORIES_DOC_NAME, categorySchema),
  shelve: mongoose.model(dbHelpers.BOOKS_SHELVES_DOC_NAME, shelveSchema),
  user: mongoose.model(dbHelpers.USERS_DOC_NAME, userSchema),
};
