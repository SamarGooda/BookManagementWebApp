const express = require("express");
const router = express.Router();
const path = require("path");

const auth = require("../middlewares/auth");
const { calcAvgBookRate, getBookRates } = require("./books")

router.get("/", (req, res) => {
    res.set("Content-Type", "text/html");
    const token = req.cookies.user_token;
    if (token)
        res.sendFile(path.resolve("../client/_site/homepage/html/user_index.html"));
    else res.sendFile(path.resolve("../client/_site/homepage/html/index.html"));
});

const ShelfModel = require('../models/shelves');
const { handleError, getUserId } = require('../helpers/general_helpers');
// routes for static files

router.get('/javascript/default.js', (req, res) => {
    res.set("Content-Type", "text/javascript");
    res.sendFile(path.resolve("../client/_site/javascript/default.js"));
})
// ===================================
// route for datatable

router.get('/data/table', auth, async (req, res) => {
    try {
        user_id = getUserId(req.cookies.user_token);
        shelves = await ShelfModel.find({ user: user_id }).populate({
            path: 'book',
            populate: {
                path: 'author'
            }
        });

        var newShelves = [];
        Object.keys(shelves).forEach((i, element) => {
            book_rates = await getBookRates(shelves[i].book);
            let obj = {
                cover: `<a href="${shelves[i].book.image}">Cover</a>`,
                name: shelves[i].book.title,
                author: shelves[i].book.author.first_name + " " + shelves[i].book.author.last_name,
                avg_rate: await calcAvgBookRate(book_rates),
                rating: book_rates,
                shelve: shelves[i].shelf,
            };
            newShelves[i] = obj;
        });
        console.log(newShelves)
        res.set("Content-Type", "application/json");
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
