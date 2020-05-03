const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dbHelpers = require("../helpers/db_helpers");

const schema = new mongoose.Schema({
  first_name: dbHelpers.nameValidation,
  last_name: dbHelpers.nameValidation,
  email: dbHelpers.emailValidation,
  password: dbHelpers.passwordValidation,
  image: dbHelpers.imageValidation,
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

// instance method
schema.methods.getFullName = function getFullName() {
  return this.first_name + " " + this.last_name;
};

const User = mongoose.model(dbHelpers.USERS_DOC_NAME, schema);
module.exports = User;
