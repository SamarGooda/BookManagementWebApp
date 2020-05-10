const express = require("express");
var path = require("path");
const router = express.Router();

router.get("/books/:id", function (req, res) {
  res.sendFile(
    path.resolve("../server/public/books/" + req.params.id + ".png")
  );
});

router.get("/authors/:id", function (req, res) {
  res.sendFile(
    path.resolve("../server/public/authors/" + req.params.id + ".png")
  );
});

router.get("/users/:id", function (req, res) {
  res.sendFile(
    path.resolve("../server/public/users/" + req.params.id + ".png")
  );
});

module.exports = router;
