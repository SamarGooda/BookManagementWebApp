const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require("multer");
const { promisify } = require('util');
const mv = promisify(fs.rename);
const rm = promisify(fs.unlink);

const UserModel = require('../models/User')



// REST

router.get('/', async (req, res) => {
    try {
        users = await UserModel.find({});
    }
    catch (err) {
        return res.send(err['message'])
    }
    return res.json(users);
});

const upload = multer({
    dest: "server/tmp/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.post('/', upload.single("image"), async (req, res, next) => {

    const { first_name, last_name, password, email } = req.body;
    try {
        if (req.file === undefined) return next(new Error('No image submitted'))

        const fileExt = path.extname(req.file.originalname).toLowerCase();
        const tempPath = req.file.path;
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
        const msg = { status: 0, message: "Error while saving record, might be duplicate email or missing info" }    //'Error while saving record'
        handleError(err, msg, res, next)
        return res.json(msg);
    }
});

router.get('/:id', async (req, res) => {
    const routeParams = req.params;
    const { id } = routeParams;

    user = await UserModel.findById(id);

    try {
        return res.json(user);
    } catch (err) {
        return res.send(err['message']);
    }
});


router.patch('/:id', (req, res) => {
    const routeParams = req.params;
    const { id } = routeParams;
    UserModel.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }, (err, user) => {
        if (!err) return res.json({ result: "success", data: user });
        else return res.send(err['message']);
    });
})

router.delete('/:id', async (req, res) => {
    const routeParams = req.params;
    const { id } = routeParams;
    user = await UserModel.findOneAndDelete({ _id: id });
    try {
        return res.json(user);
    }
    catch (err) {
        return res.send(err['message']);
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    // return 401 error is email or password doesn't exist, or if password does
    // not match the password in our records
    if (!user || !email || !password) return res.status(401).end()
    try {
        const isEqual = await bcrypt.compare(password, user.password);
        console.log(isEqual);
        if (isEqual) {
            // Create a new token with the email in the payload
            // and which expires 300 seconds after issue
            const token = jwt.sign({ email }, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })
            console.log('token:', token)

            // set the cookie as the token string, with a similar max age as the token
            // here, the max age is in milliseconds, so we multiply by 1000
            res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
            return res.send("You are now signed in.")
        }
        else return res.status(401).end()
    }
    catch (err) {
        console.log(err)
        res.json({ status: "error", data: "something went wrong." });
    }
})

// =================================================================


// routes for static files

router.get('/javascript/users.js', (req, res) => {
    res.set("Content-Type", "text/javascript");
    res.sendFile(path.resolve("../client/_site/users/javascript/users.js"));
})

router.get('/stylesheets/users.css', (req, res) => {
    res.set("Content-Type", "text/css");
    res.sendFile(path.resolve("../client/_site/users/stylesheets/users.css"));
})

// =================================================================

// logic routes

router.get('/', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/users/html/index.html"));
})

router.get('/registration', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/users/html/registration.html"));
})



router.post('/registration/submit', async (req, res, next) => {
    // escape if there's no picture submitted
    const { first_name, last_name, password, email } = req.body;



})

router.get('/forgot_password', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/users/html/forgot_password.html"));
})

router.get('/login', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/users/html/login.html"));
})

const handleError = (err, msg, res, next) => {
    console.log("something went wrong 'handleError' function here")
    // res
    //     .status(500)
    //     .contentType("text/plain")
    //     .send(msg);
    next()
};

module.exports = router