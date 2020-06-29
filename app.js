const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser')
const apiRoutes = require('./app/routes/api')
const app = express()
app.use(bodyParser.json())


app.use('/api/v1/', apiRoutes)

app.get('/', (req, res) => {
    res.send("welcome to server");
});


module.exports = app