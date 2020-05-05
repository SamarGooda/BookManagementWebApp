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

router.post('/registration', upload.single("image"), async (req, res) => {
    console.log(req.body);


    const { first_name, last_name, password, email } = req.body;

    const tempPath = req.file.path;
    const fileName = `${email}.jpg`;
    const relativePath = `uploads/${fileName}`;
    const targetPath = path.join(__dirname, relativePath);

    console.log(relativePath);
    console.log(targetPath);


    // handle picture upload
    if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
        console.log('test rename')
        fs.rename(tempPath, relativePath, err => {
            if (err) return handleError(err, res);

        });
    } else {
        console.log('test unlink')

        fs.unlink(tempPath, err => {
            if (err) return handleError(err, res);
            return new Error('Image is not of png or jpg type')
        });
    }
    try {
        const userInstance = new UserModel({
            first_name, last_name, password, email, image: relativePath
        });
        user = await userInstance.save();
        return res.json(user);
    }
    catch (err) {
        return res.send(err['message']);
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

const handleError = (err, res) => {
    console.log("something went wrong 'handeError' function here" + err)
    // res
    //     .status(500)
    //     .contentType("text/plain")
    //     .end("Oops! Something went wrong!");
};

module.exports = router