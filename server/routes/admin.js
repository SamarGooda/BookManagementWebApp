const express = require("express");
const jwt = require("jsonwebtoken");
var path = require("path");
const createError = require("http-errors");

const router = express.Router();

const jwtKey = "Ht%yh,PvT~4qV^;R"; //this should be moved to config or env var
const jwtExpirySeconds = 300;

function getNewJWT(payload) {
  // Create a new token with the username in the payload
  // and which expires 300 seconds after issue
  const token = jwt.sign({ payload }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  console.log("token:", token);
  return token;
}

router.use((req, res, next) => {
  console.log(req);

  const token = req.cookies.token;
  console.log("token is: ", token);

  if (!token) {
    next(createError(401));
  } else {
    try {
      jwt.verify(token, jwtKey);
      next();
    } catch (e) {
      console.log(e);
      next(createError(401));
    }
  }
});

// ----------------------------------------------------------------

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
