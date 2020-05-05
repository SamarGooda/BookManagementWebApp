const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require("multer");

const UserModel = require('../models/User')


router.get('/', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/html/users/index.html"));
})

router.get('/registration', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/html/users/registration.html"));
})

const upload = multer({
    dest: "tmp/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.post('/registration', upload.single("image"), async (req, res, next) => {
    console.log(req.body);


    const { first_name, last_name, password, email } = req.body;
    const fileExt = path.extname(req.file.originalname).toLowerCase();
    const tempPath = req.file.path;
    const fileName = email + fileExt;
    const relativePath = `uploads/${fileName}`;
    const targetPath = path.join(__dirname, relativePath);

    console.log(relativePath);
    console.log(targetPath);

    let flag;
    // handle picture upload
    if (fileExt === ".jpg" || fileExt === ".png") {
        flag = 1;
        fs.rename(tempPath, relativePath, err => {
            const msg = 'An error happened while saving the profile image'
            if (err) {
                flag = 0;
                return handleError(err, msg, res, next);
            }
        });
    } else {
        flag = 0;
        fs.unlink(tempPath, err => {
            const msg = 'Image is not of png or jpg type'
            console.log(msg)
            if (err) return handleError(err, msg, res, next);
            try {
                throw new Error('Image is not of png or jpg type')
            } catch (err) {
                next(err)
            }
        });
    }
    try {
        if (flag === 1) {
            const userInstance = new UserModel({
                first_name, last_name, password, email, image: relativePath
            });
            user = await userInstance.save();
            return res.json(user);
        }
    }
    catch (err) {
        const msg = 'Error while saving record'
        handleError(err, msg, res, next)
        return res.send(err);
    }

})

router.get('/forgot_password', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/html/users/forgot_password.html"));
})

router.get('/login', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/html/users/login.html"));
})

const handleError = (err, msg, res, next) => {
    console.log("something went wrong 'handleError' function here" + err)
    res
        .status(500)
        .contentType("text/plain")
        .end(msg);
    next(err)
};

module.exports = router