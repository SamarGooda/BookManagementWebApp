const mongoose = require("mongoose");
const dbHelpers = require("../helpers/db_helpers");

const { promisify } = require("util");
const fs = require("fs");
const rm = promisify(fs.unlink);

const schema = new mongoose.Schema(
  {
    first_name: dbHelpers.nameValidation,
    last_name: dbHelpers.nameValidation,
    date_of_birth: dbHelpers.dateValidation,
    image: dbHelpers.imageValidation,
  },
  { timestamps: true }
);

schema.pre("remove", { document: true }, async function (next) {
  console.log("Author -> pre remove called !!!!");

  const books = await mongoose
    .model(dbHelpers.BOOKS_DOC_NAME)
    .find({ author: this._id });

  books.forEach(async (book) => {
    await book.remove();
  });

  let imgFileName = this.image.split("/")[3];
  console.log("imgFileName: ", imgFileName);

  await rm(__dirname + "/../" + "public/authors/" + imgFileName + ".png");

  next();
});

const Author = mongoose.model(dbHelpers.AUTHORS_DOC_NAME, schema);
module.exports = Author;
