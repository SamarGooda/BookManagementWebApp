const express = require('express');
const router = express.Router();
const path = require('path');
const { promisify } = require('util');


const auth = require('../middlewares/auth');
const helpers = require('../helpers/general_helpers');

router.get('/', (req, res) => {
    res.set("Content-Type", "text/html");
    const token = req.cookies.user_token;
    if(token)
        res.sendFile(path.resolve("../client/_site/homepage/html/user_index.html"));
    else res.sendFile(path.resolve("../client/_site/homepage/html/index.html"));
})


module.exports = router