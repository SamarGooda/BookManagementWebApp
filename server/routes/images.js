const express = require("express");
var path = require("path");
const router = express.Router();

router.get("/books/:id", function (req, res) {
  console.log("heeeeeeeeeeeeere");

  res.set("Content-Type", "image/jpg");
  res.sendFile(path.resolve("../public/default_profile_pic.jpg"));
});







module.exports = router;
