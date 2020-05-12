const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require("multer");
const { promisify } = require('util');
const mv = promisify(fs.rename);
const rm = promisify(fs.unlink);

const auth = require('../middlewares/auth');

const UserModel = require('../models/User');

const db_helpers = require('../helpers/db_helpers');
const helpers = require('../helpers/general_helpers');
const auth_helper = require('../helpers/auth_helper');

// =================================================================

// user login (data)
router.post('/login', async (req, res) => {
    auth_helper.signIn(req, res);
})

// user registration (data)
router.post('/login', async (req, res) => {
    auth_helper.signIn(req, res);
})

// =================================================================

module.exports = router;