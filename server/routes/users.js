
const express = require('express');
const router = express.Router();
var path = require("path");


router.get('/', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/html/users/index.html"));
})

router.get('/registration', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/html/users/registration.html"));
})

router.get('/forgot_password', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/html/users/forgot_password.html"));
})

router.get('/login', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/html/users/login.html"));
})


module.exports = router