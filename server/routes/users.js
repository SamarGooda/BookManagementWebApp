
const express = require('express');
const router = express.Router();
const path = require('path');

const UserModel = require('../models/User')


router.get('/', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/html/users/index.html"));
})

router.get('/registration', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve("../client/_site/html/users/registration.html"));
})

router.post('/registration', async (req, res) => {
    console.log(req.body);

    const { firstname, lastname, password, email } = req.body;
    const userInstance = new UserModel({
        firstName, lastName, password, dateOfBirth, gender, email, phoneNo
    });
    try {
        user = await userInstance.save();
        return res.json(user);
    }
    catch (err) {
        return res.send(err['message']);
    }

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