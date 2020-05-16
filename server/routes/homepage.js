const express = require("express");
const router = express.Router();
const path = require("path");
const helpers = require("../helpers/general_helpers");
const auth = require("../middlewares/auth");
const { calcAvgBookRate, getBookRates } = require("../helpers/rate_helpers");

router.get("/", (req, res) => {
    res.set("Content-Type", "text/html");
    const token = req.cookies.user_token;
    if (helpers.isValidToken(token))
        res.sendFile(path.resolve("../client/_site/homepage/html/user_index.html"));
    else res.sendFile(path.resolve("../client/_site/users/html/login.html"));
});

const ShelfModel = require("../models/shelves");
const { handleError, getUserId } = require("../helpers/general_helpers");
// routes for static files

router.get("/javascript/default.js", (req, res) => {
    res.set("Content-Type", "text/javascript");
    res.sendFile(path.resolve("../client/_site/javascript/default.js"));
});
// ===================================
// route for datatable

router.get("/data/table", auth, async (req, res) => {
    try {
        user_id = getUserId(req.cookies.user_token);
        shelves = await ShelfModel.find({ user: user_id }).populate({
            path: "book",
            populate: {
                path: "author",
            },
        });
        var i = 0;
        var newShelves = [];
        for await (const i of Object.keys(shelves)) {
            const book_rates = await getBookRates(shelves[i].book);
            const avg_rate = await calcAvgBookRate(book_rates)
            const authorFullName = shelves[i].book.author.first_name + " " + shelves[i].book.author.last_name;
            let bookId = shelves[i].book._id;
            var select0 = select1 = select2 = select3 = " ";
            switch (shelves[i].shelf) {
                case 'read':
                    select1 = 'selected';
                    break;
                case 'current':
                    select2 = 'selected';
                    break;
                case 'want':
                    select3 = 'selected';
                    break;
                default:
                    select0 = 'selected';
            }
            var obj = {
                cover: `<a href="${shelves[i].book.image}">Cover</a>`,
                name: `<a href="/books/${shelves[i].book._id}">${shelves[i].book.title}</a>`,
                author: `<a href="/authors/${shelves[i].book.author._id}">${authorFullName}</a>`,
                avg_rate: avg_rate,
                rating: book_rates[0].rate,
                shelve: `<select class="form-control sel1" data-book-id=${bookId} style="width:12rem; margin-top: 1rem;">
                <option value="none" ${select0}>---Add to shelf---</option>
                <option value="read" ${select1}>Read</option>
                <option value="current" ${select2}>Currently Reading</option>
                <option value="want" ${select3}>Want To Read</option>
              </select>`,
            };
            newShelves[i] = obj;
        };
        res.set("Content-Type", "application/json");
        return res.json(newShelves);
    } catch (err) {
        console.error(err);
        return handleError(res);
    }
});


router.get('/', (req, res) => {
    res.set("Content-Type", "text/html");
    const token = req.cookies.user_token;
    if (token)
        res.sendFile(path.resolve("../client/_site/homepage/html/user_index.html"));
    else res.sendFile(path.resolve("../client/_site/homepage/html/index.html"));
})

// router.get("/", (req, res) => {
//   res.set("Content-Type", "text/html");
//   const token = req.cookies.user_token;
//   if (token)
//     res.sendFile(path.resolve("../client/_site/homepage/html/user_index.html"));
//   else res.sendFile(path.resolve("../client/_site/homepage/html/index.html"));
// });

module.exports = router;
