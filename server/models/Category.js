const mongoose = require("mongoose");
const dbHelpers = require("../helpers/db_helpers");

const schema = new mongoose.Schema(
  {
    name: dbHelpers.categoryNameValidation,
  },
  { timestamps: true }
);

const Category = mongoose.model(dbHelpers.CATEGORIES_DOC_NAME, schema);
module.exports = Category;
