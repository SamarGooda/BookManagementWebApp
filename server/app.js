const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users")
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/books");
const categoryRouter = require("./routes/categories");
const adminRouter = require("./routes/admin");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/books", bookRouter);
app.use("/author", authorRouter);
app.use("/category", categoryRouter);
app.use("/admin", adminRouter);

app.use((err, req, res, next) => {
  debugger;
  console.log(err);
  res.status(500).send(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
