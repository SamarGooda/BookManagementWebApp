const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const homepageRouter = require("./routes/homepage.js")
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/books");
const categoryRouter = require("./routes/categories");
const adminRouter = require("./routes/admin");
const errorsRouter = require("./routes/errors");
const reviewsRouter = require("./routes/reviews");
const ratesRouter = require("./routes/rates");
const imagesRouter = require("./routes/images");

const app = express();

mongoose.connect(
  "mongodb://localhost:27017/BookManagementWebApp",
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) return console.info("connection established to mongodb");
    console.error("Error occurred while connecting to db " + err);
  }
);

app.get("/stylecheets/default.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(path.resolve("../client/_site/stylecheets/default.css"));
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homepageRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/categories", categoryRouter);
app.use("/admin", adminRouter);
app.use("/errors", errorsRouter);
app.use("/reviews", reviewsRouter);
app.use("/rates", ratesRouter);
app.use("/images", imagesRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  console.log(err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  switch (res.statusCode) {
    case 401:
      res.redirect("/errors/401");
      break;
    case 404:
      res.redirect("/errors/404");
      break;
    default:
      res.send(err);
  }
});

module.exports = app;
