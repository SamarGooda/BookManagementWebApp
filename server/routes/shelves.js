const express = require('express');
const router = express.Router();
const path = require('path');
const { promisify } = require('util');


const auth = require('../middlewares/auth');
const helpers = require('../helpers/general_helpers');

const ShelfModel = require('../models/shelves');
const { handleError, getUserId } = require('../helpers/general_helpers');
// routes for static files

// REST

// get all shelves for a user
router.get('/data', auth, async (req, res) => {
    try {
        user_id = getUserId(req.cookies.user_token);
        shelves = await ShelfModel.find({ user: user_id }).populate({
            path: 'book',
            populate: {
                path: 'author'
            }
        });
        return res.json(shelves);
    }
    catch (err) {
        console.error(err);
        return handleError(res);
    }
});

// add new book to shelf
router.post('/data',auth,  async (req, res, next) => {
    const user = getUserId(req.cookies.user_token);
    const { shelf, book } = req.body;
    try {
        const newBookOnShelf = new ShelfModel({
            shelf, user, book
        });
        result = await newBookOnShelf.save();
        return res.json(result);

    }
    catch (err) {
        console.error(err)
        const msg = "Error while saving record"
        return helpers.handleError(res, msg);
    }
});

// get specific user data by id ** uses _id of db
router.get('/data/:id', async (req, res) => {
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
router.patch('/data/:id', (req, res) => {
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

router.delete('/data/:id', async (req, res) => {
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