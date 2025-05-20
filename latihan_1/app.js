const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.put('/', (req,res) => {
    res.json({
        name:"kjhkjj",
    })
})

app.get(`/product/:id` , (req,res) => {
    const {id, username} = req.params;
    res.send(`dari user : ke- ${id} dengan username : ${username}`)
})

app.get(`/product` , (req,res) => {
    const {categoryid} = req.query;
    res.send(`dari user : ke- ${categoryid}`)
})



module.exports = app;
