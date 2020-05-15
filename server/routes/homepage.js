const express = require("express");
const router = express.Router();
const path = require("path");
const helpers = require("../helpers/general_helpers");
const auth = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  const token = req.cookies.user_token;
  if (helpers.isValidToken(token))
    res.sendFile(path.resolve("../client/_site/homepage/html/user_index.html"));
  else res.sendFile(path.resolve("../client/_site/users/html/login.html"));
});

const ShelfModel = require("../models/shelves");
const { handleError, getUserId } = require("../helpers/general_helpers");
// routes for static files

router.get("/javascript/default.js", (req, res) => {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/javascript/default.js"));
});
// ===================================
// route for datatable

router.get("/data/table", auth, async (req, res) => {
  try {
    user_id = getUserId(req.cookies.user_token);
    shelves = await ShelfModel.find({ user: user_id }).populate({
      path: "book",
      populate: {
        path: "author",
      },
    });
    res.set("Content-Type", "application/json");
    var newShelves = [];
    Object.keys(shelves).forEach((i, element) => {
      let obj = {
        cover: "i",
        name: shelves[i].book.title,
        author:
          shelves[i].book.author.first_name +
          " " +
          shelves[i].book.author.last_name,
        avg_rate: i,
        rating: i,
        shelve: shelves[i].shelf,
      };
      newShelves[i] = obj;
    });
    console.log(newShelves);
    return res.json(newShelves);
  } catch (err) {
    console.error(err);
    return handleError(res);
  }
});

// router.get("/", (req, res) => {
//   res.set("Content-Type", "text/html");
//   const token = req.cookies.user_token;
//   if (token)
//     res.sendFile(path.resolve("../client/_site/homepage/html/user_index.html"));
//   else res.sendFile(path.resolve("../client/_site/homepage/html/index.html"));
// });

module.exports = router;
