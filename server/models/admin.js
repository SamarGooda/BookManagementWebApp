const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dbHelpers = require("../helpers/db_helpers");

const schema = new mongoose.Schema({
  email: dbHelpers.emailValidation,
  password: dbHelpers.passwordValidation,
});

schema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      hashed = await bcrypt.hash(this.password, 10);
      this.password = hashed;
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

// const admin = mongoose.model(dbHelpers.ADMIN_DOC_NAME, schema);
module.exports = schema;
