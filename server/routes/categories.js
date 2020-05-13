
const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/Category');

router.get('/data',async (req, res) => {
    res.send('listing all categories.')
});

router.post('/data', async (req, res) => {
    res.send('creating new category.');
});

router.get('/data/:id',async (req, res) => {
    res.send(`listing category of id = ${req.params.id}`);
});

router.patch('/data/:id', async (req, res) => {
    res.send(`Editing category of id = ${req.params.id}`);
})

router.delete('/data/:id', async(req, res) => {
    res.send(`Deleting category of id = ${req.params.id}`);
});


module.exports = router