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
router.post('/data', auth, async (req, res, next) => {
    try {
        const user = getUserId(req.cookies.user_token);
        const { shelf, book } = req.body;
        const query = {
            user: user,
            book: book,
        }
        const newData = { shelf: shelf }
        const upsert = await ShelfModel.findOneAndUpdate(query, newData, { upsert: true });
        return res.json(upsert);
    }
    catch (err) {
        console.error(err)
        const msg = "Error while saving record"
        return helpers.handleError(res, msg);
    }
});

// get specific book on shelf data by id ** uses _id of db
router.get('/data/:id', async (req, res) => {
    try {
        const routeParams = req.params;
        const { id } = routeParams;
        user_id = getUserId(req.cookies.user_token);
        bookShelf = await ShelfModel.findOne({ user: user_id, book: id }).populate({
            path: 'book',
            populate: {
                path: 'author'
            }
        });
        if (bookShelf === null)
            bookShelf = { shelf: 'none' }
        return res.json(bookShelf);
    }
    catch (err) {
        console.error(err);
        return handleError(res);
    }
});

// edit book on shelf data
router.patch('/data/:id', (req, res) => {

})

// delete book from shelf

router.delete('/data/:id', async (req, res) => {

})

// =================================================




module.exports = router