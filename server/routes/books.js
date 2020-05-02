
const express = require('express')
const router = express.Router()



router.get("/", async (request, response) => {});

router.get("/javascript/admin.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.resolve("../client/_site/javascript/admin.js"));
});









module.exports = router