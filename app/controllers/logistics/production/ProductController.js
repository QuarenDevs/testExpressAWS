const e = require('express')
const { models } = require('../../../models')
const Product = require('../../../models/logistics/production/Product')
const modelName = "Product"

/**
 * @swagger
 * /api/v1/products/:
 *      get:
 *          tags:
 *              -   Marketing
 *                  -   Sales
 *                      -   Product
 *          description: Use to to request all products. Model Product
 *          responses:
 *              '200':
 *                  description: A successful response
 */
async function index(request, response)
{
    try {
        const products = await Product.find().lean().exec()

        //response.status(200).send(`Desde el ${modelName}Controller: index\n\n${products}`)
        response.status(200).send(products)
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}


/**
 * @swagger
 * /api/v1/products/{id}:
 *      get:
 *          tags:
 *              -   Marketing
 *                  -   Sales
 *                      -   Product
 *          description: Use to to request the product with the given id. Model Product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                  type: integer
 *                  required: true
 *                  description: Numeric ID of the user to get
 *          responses:
 *              '200':
 *                  description: A successful response
 */
async function show(request, response)
{
    
    const { id } = request.params;

    let foundProduct = await findByShortId(request, response, id)
    
    if( foundProduct != undefined)
    {
        console.log(id + "     " + foundProduct)
        response.send(foundProduct);
    }
    
    
}

/**
 * @swagger
 * /api/v1/products/:
 *      post:
 *          tags:
 *              -   Marketing
 *                  -   Sales
 *                      -   Product
 *          description: Use to to request all users. Model ${modelName}
 *          requestBody:
 *              description: Pet object that needs to be added to the store
 *              content:
 *              application/json:
 *                  schema:
 *              required: true
 *          responses:
 *              '200':
 *                  description: A successful response
 */
async function store(request, response)
{
    /*
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
    }*/

    
    const newProduct = Product(request.body)

    newProduct.save()

    response.status(200).send(`Desde el ${modelName}Controller: store ${JSON.stringify(newProduct)}`)
}


/**
 * @swagger
 * /api/v1/products/{id}:
 *      put:
 *          tags:
 *              -   Marketing
 *                  -   Sales
 *                      -   Product
 *          description: Use to to update the product with the given id. Model Product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                  type: integer
 *                  required: true
 *                  description: Numeric ID of the user to get
 *          responses:
 *              '200':
 *                  description: A successful response
 */
async function update (request, response)
{
    const { id } = request.params;

    let foundProduct = await findByShortId(request, response, id)

    /*
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
   */

    if ( foundProduct != undefined )
    {
        response.status(200).send(foundProduct);
        //response.status(200).send(`Desde el ${modelName}Controller: update con id: ${id}`)

    }


    

}

/**
 * @swagger
 * /api/v1/products/{id}:
 *      delete:
 *          tags:
 *              -   Marketing
 *                  -   Sales
 *                      -   Product
 *          description: Use to to update the product with the given id. Model Product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                  type: integer
 *                  required: true
 *                  description: Numeric ID of the user to get
 *          responses:
 *              '200':
 *                  description: A successful response
 */
async function destroy (request, response)
{
    const { id } = request.params;

    let foundProduct = await findByShortId(request, response, id)
    
    if ( foundProduct != undefined )
    {
        response.status(200).send(foundProduct);
        //response.status(200).send(`Desde el ${modelName}Controller: update con id: ${id}`)

    }

}

async function findByShortId(request, response, id)
{
    let foundProduct = await Product.findOne({sid: id})
    
    if ( !foundProduct )
    {
        response.status(404).send({error: 404, message:`No se encuentra el producto con id ${id}`})
        return undefined
    }

    return foundProduct
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
    routes : [
        // Default Routes - Standard CRUD
        { method: 'GET', endpoint: "", callback: index},
        { method: 'GET', endpoint: ":id", callback: show},
        { method: 'POST', endpoint: "", callback: store},
        { method: 'PUT', endpoint: ":id", callback: update},
        { method: 'DELETE', endpoint: ":id", callback: destroy},

        // Specific routes
        
    ]
}