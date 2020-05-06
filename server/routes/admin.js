const express = require("express");
const jwt = require("jsonwebtoken");
var path = require("path");
const createError = require("http-errors");
const adminModel = require("../models/admin");
const bcrypt = require("bcrypt");

const router = express.Router();

const jwtKey = "Ht%yh,PvT~4qV^;R"; //this should be moved to config or env var
const jwtExpirySeconds = 86400; // 24 hours

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

function isValidToken(token) {
  if (!token) {
    return false;
  } else {
    try {
      jwt.verify(token, jwtKey);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

function getUserId(token) {
  console.log("getUserId ======================>");
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtKey);
      console.log("decoded", decoded);
      return decoded.payload;
    } catch (e) {
      console.log(e);
    }
  }

  return undefined;
}

router.use((req, res, next) => {
  if (
    req.path === "/" ||
    req.path === "/login" ||
    req.path === "/stylesheets/login.css" ||
    req.path === "/javascript/login.js"
  ) {
    next();
    return; //do not proceed
  }

  const token = req.cookies.token;
  console.log("token is: ", token);
  if (isValidToken(token)) {
    next();
  } else {
    res.redirect("/admin");
  }
});

// ----------------------------------------------------------------

router.get("/javascript/index.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/admin_panel/javascript/index.js"));
});

router.get("/stylesheets/index.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(
    path.resolve("../client/_site/admin_panel/stylesheets/index.css")
  );
});

router.get("/javascript/login.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/admin_panel/javascript/login.js"));
});

router.get("/stylesheets/login.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(
    path.resolve("../client/_site/admin_panel/stylesheets/login.css")
  );
});

router.get("/data", async function (req, res) {
  const token = req.cookies.token;
  console.log("token is: ", token);
  let userId = getUserId(token);
  console.log("userId: " + userId);
  if (!userId) {
    res.status(400).send();
  } else {
    const admin = await adminModel.findById(userId);
    res.json(admin.email);
  }
});

router.get("/", function (req, res) {
  const token = req.cookies.token;
  console.log("token is: ", token);
  if (isValidToken(token)) {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/admin_panel/html/index.html"));
  } else {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/admin_panel/html/login.html"));
  }
});

// router.post("/logout", async (request, response) => {
//   const token = request.cookies.token;
//   console.log("token is: ", token);
//   try {
//     jwt.destroy(token);
//   } catch (e) {
//     console.log(e);
//   }
//   response.status(201).send();
// });

router.post("/login", async (request, response) => {
  // console.log(request.body);

  const { email, password } = request.body;

  try {
    const admin = await adminModel.findOne({ email: email });
    console.log(admin);

    if (!admin) {
      response.status(401).send();
      return;
    }

    console.log(admin.password);

    const isSamePassword = await bcrypt.compare(password, admin.password);

    if (isSamePassword) {
      token = getNewJWT(admin._id);
      response.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
      response.status(201).send();
    } else {
      response.status(401).send();
    }
  } catch (error) {
    console.log(error);
    response.status(401).send();
  }
});

// -----------------------------------------------------------------------

// error handler
// router.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   switch (res.status) {
//     case 401:
//       res.send("4000000000000000001111");
//       // res.set("Content-Type", "text/html");
//       // res.sendFile(path.resolve("../client/_site/html/admin_panel/login.html"));
//       break;
//     case 404:
//       res.send("4000000000000000004");
//       break;
//     default:
//       res.send(err);
//   }
// });

// -----------------------------------------------------------------------

module.exports = router;
