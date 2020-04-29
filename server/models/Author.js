const mongoose = require("mongoose");
const dbHelpers = require("../helpers/db_helpers");

const schema = new mongoose.Schema(
  {
    first_name: dbHelpers.nameValidation,
    last_name: dbHelpers.nameValidation,
    date_of_birth: dbHelpers.dateValidation,
    image: dbHelpers.imageValidation,
  },
  { timestamps: true }
);

const Author = mongoose.model(dbHelpers.AUTHORS_DOC_NAME, schema);
module.exports = Author;
