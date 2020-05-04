const mongoose = require("mongoose");
const authorModel = require("./Author");
const categoryModel = require("./Category");

const dbHelpers = require("../helpers/db_helpers");

const schema = new mongoose.Schema(
  {
    title: dbHelpers.bookTitleValidation,
    image: dbHelpers.imageValidation,
    author: dbHelpers.bookAuthorValidation,
    category: dbHelpers.categoryValidation,
  },
  { timestamps: true }
);

// schema.pre("save", async function (next) {
//   try {
//     const author = authorModel.findById(this.author);
//     if (!author) {
//       next(new Error("Author is not valid!"));
//     }

//     const category = categoryModel.findById(this.category);
//     if (!category) {
//       next(new Error("Category is not valid!"));
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   next();
// });

const Book = mongoose.model(dbHelpers.BOOKS_DOC_NAME, schema);
module.exports = Book;
