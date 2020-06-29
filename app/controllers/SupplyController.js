const Product = require('../models/Product')
const e = require('express')
const { func } = require('joi')

const model = "Supply"

async function index(request, response)
{
    try {
        response.status(200).send(`Desde el ${model} CONTROLLER`)
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

async function show(request, response)
{
    try {
        response.status(200).send(`Desde el ${model} CONTROLLER SHOW`)
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

async function store(request, response)
{
    try {
        response.status(200).send(`Desde el ${model} CONTROLLER STORE`)
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

async function update (request, response){
    const requestedId = request.params.id;

    try {
        response.status(200).send(`Desde el  ${model} CONTROLLER UPDATE`)
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}


async function destroy(request, response)
{
    try {
        response.status(200).send(`Desde el  ${model} CONTROLLER DESTROY`)
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