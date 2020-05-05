const express = require("express");
var path = require("path");
const router = express.Router();

router.get("/404.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/stylecheets/404.css"));
});

router.get("/404", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/html/errors/404.html"));
});

router.get("/404.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/stylecheets/404.css"));
});

router.get("/401", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/html/errors/401.html"));
});

module.exports = router;
