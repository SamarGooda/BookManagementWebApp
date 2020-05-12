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

// helper functions
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

// =================================================

// get current logined user data
router.get("/data", async function (req, res) {
    const token = req.cookies.token;
    console.log("token is: ", token);
    let userId = getUserId(token);
    console.log("userId: " + userId);
    if (!userId) {
        res.status(400).send();
    } else {
        const user = await UserModel.findById(userId);
        const data = {
            email: user.email,

        }
        res.json();
    }
});
// =====================================================================

// REST

// get all users
router.get('/', async (req, res) => {
    try {
        users = await UserModel.find({});
    }
    catch (err) {
        return res.send(err['message'])
    }
    return res.json(users);
});

// set upload to use multer 

const upload = multer({
    dest: "tmp/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

// add new user
router.post('/', upload.single("image"), async (req, res, next) => {

    const { first_name, last_name, password, email } = req.body;
    try {
        if (req.file === undefined) return helpers.handleError(res, "profile picture required")

        const fileExt = path.extname(req.file.originalname).toLowerCase();
        const tempPath = path.join(__dirname, "..", req.file.path);
        const fileName = email + fileExt;
        const relativePath = `/public/users/${fileName}`;
        const targetPath = path.join(__dirname, "..", relativePath);

        let flag;
        // handle picture upload
        if (fileExt === ".jpg" || fileExt === ".png") {
            await mv(tempPath, targetPath);
        } else {
            await rm(tempPath);
        }

        const userInstance = new UserModel({
            first_name, last_name, password, email, image: relativePath
        });
        user = await userInstance.save();
        return res.json(user);

    }
    catch (err) {
        console.error(err)
        const msg = "Error while saving record"
        return helpers.handleError(res, msg);
    }
});

// get specific user data by id ** uses _id of db
router.get('/:id', auth, async (req, res) => {
    const routeParams = req.params;
    const { id } = routeParams;

    user = await UserModel.findById(id);

    try {
        return res.json(user);
    } catch (err) {
        return helpers.handleError(res);
    }
});

// edit user data
router.patch('/:id', (req, res) => {
    const routeParams = req.params;
    const { id } = routeParams;
    UserModel.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }, (err, user) => {
        if (!err) return res.json({ result: "success", data: user });
        else {
            console.error(err);
            helpers.handleError(res);
        }
    });
})

// delete user

router.delete('/:id', async (req, res) => {
    const routeParams = req.params;
    const { id } = routeParams;
    try {
        user = await UserModel.findOneAndDelete({ _id: id });
        if (user) return res.json(user);
        return helpers.handleError(res, "user not found");
    }
    catch (err) {
        console.error(err);
        return helpers.handleError(res);
    }
})

// =================================================

module.exports = router