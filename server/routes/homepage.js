const express = require('express');
const router = express.Router();
const path = require('path');
const { promisify } = require('util');


const auth = require('../middlewares/auth');
const helpers = require('../helpers/general_helpers');

const ShelfModel = require('../models/shelves');
const { handleError, getUserId } = require('../helpers/general_helpers');
// routes for static files

router.get('/javascript/default.js', (req, res) => {
    res.set("Content-Type", "text/javascript");
    res.sendFile(path.resolve("../client/_site/javascript/default.js"));
})
// ===================================
// route for datatable

router.get('/data/table', async (req, res) => {
    try {
        user_id = getUserId(req.cookies.user_token);
        shelves = await ShelfModel.find({ user: user_id }).populate({
            path: 'book',
            populate: {
                path: 'author'
            }
        });
        res.set("Content-Type", "application/json");
        i = 0
        var newShelves = [];
        Object.keys(shelves).forEach((key, element) => {
            let obj = {
                cover: "i",
                name: shelves[i].book.title,
                author: shelves[i].book.author.first_name + " " + shelves[i].book.author.last_name,
                avg_rate: i,
                rating: i,
                shelve: shelves[i].shelf,
            };
            newShelves[key] = obj;
            // newShelves['author'] 
            // newShelves['avg_rate'] 
            // newShelves['rating'] 
            // newShelves['shelve'] 
            i++;
        });
        console.log(newShelves)
        return res.json(newShelves);
    }
    catch (err) {
        console.error(err);
        return handleError(res);
    }
})

router.get('/', (req, res) => {
    res.set("Content-Type", "text/html");
    const token = req.cookies.user_token;
    if (token)
        res.sendFile(path.resolve("../client/_site/homepage/html/user_index.html"));
    else res.sendFile(path.resolve("../client/_site/homepage/html/index.html"));
})


module.exports = router