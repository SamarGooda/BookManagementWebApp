const express = require("express");
const router = express.Router();
var path = require("path");

router.get("/", async (request, response) => {});

router.get("/javascript/admin.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/javascript/admin.js"));
});

router.get("/stylecheets/admin.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/stylecheets/admin.css"));
});

router.get("/login", function (req, res) {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/html/admin_panel/login.html"));
});

router.post("/login", async (request, response) => {
  const { e, p } = request.body;

  const new_post = new postsModel({
    author: a,
    content: c,
    date: d,
  });

  try {
    const saved_post = await new_post.save();
    response.json(saved_post);
  } catch (error) {
    console.log(error);
    response.send("could not save post --> error");
  }
});

module.exports = router;
