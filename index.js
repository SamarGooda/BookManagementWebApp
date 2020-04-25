const express = require ("express")
const mongoose = require ('mongoose')
const logger = require("morgan")
const app = express()


const authorRouter = require ('./routes/author')
const bookRouter = require ('./routes/books')
const categoryRouter = require ('./routes/categories')


//built in middle wares
app.use(express.json())

const log = require('./middlewares/log')

// app.use(log())
app.use(logger("dev"));
app.use('/books',bookRouter)
app.use('/author',authorRouter)
app.use('/category',categoryRouter)



app.listen(5000,(err) => {
    if (!err)
       return console.log("started server on port 5000")
       console.log(err)
 })
