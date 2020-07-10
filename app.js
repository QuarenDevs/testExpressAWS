const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser')
const apiRoutes = require('./app/routes/api')
const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({extended: false})) 
app.use(bodyParser.json()) 
app.use(cors())

app.use('', apiRoutes)

app.get('/', (request, response) => {
    response.send("welcome to server");
});


module.exports = app