const RateModel = require("../models/book_rate");

async function getBookRates(BookInstance) {
    const query = { book: BookInstance };
    const book_rates = await RateModel.find(query);
    return book_rates
}

async function calcAvgBookRate(book_rates) {
    let sum = 0;
    for (i = 0; i < book_rates.length; i++) {
        sum += book_rates[i].rate;
    }
    const avg_rate = sum / book_rates.length;
    return avg_rate;
}

module.exports = { getBookRates, calcAvgBookRate }