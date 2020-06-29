const Product = require('../models/Product')
const e = require('express')
const { func } = require('joi')

async function index(request, response)
{
    try {
        response.status(200).send("Desde el ProductController")
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

async function show(request, response)
{
    
}

async function store(request, response)
{
    try {
        const {
            name,
            size,
            unitaryPrice,
            description
        } = request.body

        const newProduct = Product({
            name,
            size,
            unitaryPrice,
            description
        })

        //newProduct.save()

        response.status(200).send(newProduct)
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

async function update (request, response){
    const requestedId = request.params.id;

    let foundProduct = data.find(product => product.id === parseInt(requestedId));
    if ( !foundProduct )
    {
        response.status(404).send(`No se encuentra el producto con id ${requestedId}`)
    }

    const {error} = validateProduct(request.body);

    if(error)
    {
        response.status(400).send(validation.error.details)
    }
    
    const requestedName = request.body.name;
    const requestedPrice = request.body.price;
    const requestedUnits = request.body.units;
    

    foundProduct.name = requestedName;
    foundProduct.price = requestedPrice;
    foundProduct.units = requestedUnits;
   

    response.send(foundProduct);
}


async function destroy(request, response)
{
    
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