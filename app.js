require('dotenv').config()
const Joi = require('joi');
const express = require('express');
const bodyParser = require('body-parser')

const { appConfig } = require('./config')

const app = express()
app.use(bodyParser.json())

let data = [
    {id: 1, name: "Producto 1", price: 10000, units: 10},
    {id: 2, name: "Producto 2", price: 11000, units: 8},
    {id: 3, name: "Producto 3", price: 13000, units: 2},
    {id: 4, name: "Producto 4", price: 20000, units: 5},
    {id: 5, name: "Producto 5", price: 4000, units: 6},
];

app.get('/', (req, res) => {
    res.send("welcome to server");
});

app.get('/api/products', (req, res) => {
    res.send(data);
});

app.get('/api/products/:id', (req, res) => {
    const requestedId = req.params.id;

    let foundProduct = data.find(product => product.id === parseInt(requestedId));
    if ( !foundProduct )
    {
        res.status(404).send(`No se encuentra el producto con id ${requestedId}`)
    }
    res.send(foundProduct);
});


app.post('/api/products', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number(),
        units: Joi.number().integer()
    });

    const {error} = validateProduct(req.body);

    if(error)
    {
        res.status(400).send(validation.error.details)
    }
    
    const requestedName = req.body.name;
    const requestedPrice = req.body.price;
    const requestedUnits = req.body.units;
    

    const newElement = {
        id: data.length + 1, 
        name: requestedName,
        price: requestedPrice,
        units: requestedUnits
    };

    data.push(newElement);
    res.send(newElement);
});




app.put('/api/products/:id', (req, res) => {
    const requestedId = req.params.id;

    let foundProduct = data.find(product => product.id === parseInt(requestedId));
    if ( !foundProduct )
    {
        res.status(404).send(`No se encuentra el producto con id ${requestedId}`)
    }

    const {error} = validateProduct(req.body);

    if(error)
    {
        res.status(400).send(validation.error.details)
    }
    
    const requestedName = req.body.name;
    const requestedPrice = req.body.price;
    const requestedUnits = req.body.units;
    

    foundProduct.name = requestedName;
    foundProduct.price = requestedPrice;
    foundProduct.units = requestedUnits;
   

    res.send(foundProduct);
});

function validateProduct(product){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number(),
        units: Joi.number().integer()
    });

    return Joi.validate(product, schema);  
}

app.listen (appConfig.port, () => {
    console.log (`iniciando servidor ${appConfig.port}`);
});