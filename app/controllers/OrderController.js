const Product = require('../models/Product')
const e = require('express')
const { func } = require('joi')

async function index(request, response)
{
    try {
        response.status(200).send("Desde el ORDER CONTROLLER")
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

async function show(request, response)
{
    try {
        response.status(200).send("Desde el ORDER CONTROLLER SHOW")
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

async function store(request, response)
{
    try {
        response.status(200).send("Desde el ORDER CONTROLLER STORE")
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

async function update (request, response){
    const requestedId = request.params.id;

    try {
        response.status(200).send("Desde el  ORDER CONTROLLER UPDATE")
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}


async function destroy(request, response)
{
    try {
        response.status(200).send("Desde el  ORDER CONTROLLER DESTROY")
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

function validateProduct(product){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number(),
        units: Joi.number().integer()
    });

    return Joi.validate(product, schema);  
}
module.exports = {
    index,
    show,
    store,
    update,
    destroy
}