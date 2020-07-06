const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser')
const apiRoutes = require('./app/routes/api')
const app = express()

app.use('', apiRoutes)

app.get('/', (req, res) => {
    res.send("welcome to server");
});


module.exports = app