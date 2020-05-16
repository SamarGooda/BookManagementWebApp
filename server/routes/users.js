const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { promisify } = require("util");
const mv = promisify(fs.rename);
const rm = promisify(fs.unlink);

// const auth = require('../middlewares/auth');

const UserModel = require("../models/User");

const db_helpers = require("../helpers/db_helpers");
const { getUserId, handleError, isValidToken } = require("../helpers/general_helpers");

// helper functions

// =================================================

// get current logined user data
router.get("/current_user", async function (req, res) {
  try {
    const token = req.cookies.user_token;
    console.log("token is: ", token);
    let userId = getUserId(token);
    console.log("userId: " + userId);
    if (!userId) {
      res.status(400).send();
    } else {
      const user = await UserModel.findById(userId);
      const data = {
        email: user.email,
        name: user.first_name + " " + user.last_name
      };
      res.json(data);
    }
  } catch (err) {
    console.error(err);
    return handleError(res);
  }
});
// =====================================================================
// routes for static files

router.get("/javascript/users.js", (req, res) => {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/users/javascript/users.js"));
});

router.get("/stylesheets/users.css", (req, res) => {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/users/stylesheets/users.css"));
});

// =================================================================

// REST

// get all users
router.get("/data", async (req, res) => {
  try {
    users = await UserModel.find({});
  } catch (err) {
    return res.send(err["message"]);
  }
  return res.json(users);
});

// set upload to use multer

const upload = multer({
  dest: "tmp/",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

// add new user
router.post("/data", upload.single("image"), async (req, res, next) => {
  const { first_name, last_name, password, email } = req.body;
  try {
    const fileName = "default_profile_pic.jpg";
    const relativePath = `/public/users/${fileName}`;
    const targetPath = path.join(__dirname, "..", relativePath);

    const userInstance = new UserModel({
      first_name,
      last_name,
      password,
      email,
      image: relativePath,
    });
    user = await userInstance.save();
    return res.json(user);
  } catch (err) {
    console.error(err);
    const msg = "Error while saving record";
    return handleError(res, msg);
  }
});

// get specific user data by id ** uses _id of db
router.get("/data/:id", async (req, res) => {
  const routeParams = req.params;
  const { id } = routeParams;

  user = await UserModel.findById(id);

  try {
    return res.json(user);
  } catch (err) {
    return handleError(res);
  }
});

// edit user data
router.patch("/data/:id", (req, res) => {
  const routeParams = req.params;
  const { id } = routeParams;
  UserModel.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (!err) return res.json({ result: "success", data: user });
      else {
        console.error(err);
        handleError(res);
      }
    }
  );
});

// delete user

router.delete("/data/:id", async (req, res) => {
  const routeParams = req.params;
  const { id } = routeParams;
  try {
    user = await UserModel.findOneAndDelete({ _id: id });
    if (user) return res.json(user);
    return handleError(res, "user not found");
  } catch (err) {
    console.error(err);
    return handleError(res);
  }
});

// =================================================

// html routes
router.get("/registration", (req, res) => {
  const token = req.cookies.user_token;
  if (!isValidToken(token)) {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/users/html/registration.html"));
  } else {
    res.redirect("/");
  }
});

// router.get("/login", (req, res) => {
//   res.set("Content-Type", "text/html");
//   res.sendFile(path.resolve("../client/_site/users/html/login.html"));
// });

router.get("/forgot_password", (req, res) => {
  res.set("Content-Type", "text/html");
  res.sendFile(path.resolve("../client/_site/users/html/forgot_password.html"));
});

// =================================================================

module.exports = router;
