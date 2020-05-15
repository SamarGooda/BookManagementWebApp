const mongoose = require("mongoose");
const dbHelpers = require("../helpers/db_helpers");

// const models = require("./models");
const models = require("./models");

const schema = new mongoose.Schema(
  {
    name: dbHelpers.categoryNameValidation,
  },
  { timestamps: true }
);

schema.pre("remove", async function (next) {
  await models.book.find({ category: this.id }).deleteMany();
  next();
});

// const Category = mongoose.model(dbHelpers.CATEGORIES_DOC_NAME, schema);
module.exports = schema;
