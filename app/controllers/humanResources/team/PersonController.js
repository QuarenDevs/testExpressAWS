const e = require('express')

const modelName = "Person"

/**
 * @swagger
 * /api/v1/people:
 *      get:
 *          tags:
 *              -   Human Resources
 *                  -   Team
 *                      -   People
 *          description: Use to to request all users. Model ${modelName}
 *          responses:
 *              '200':
 *                  description: A successful response
 */
async function index(request, response)
{
    try {
        response.status(200).send(`Desde el ${modelName}Controller: index`)
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

/**
 * @swagger
 * /api/v1/people/{id}:
 *      get:
 *          tags:
 *              -   Human Resources
 *                  -   Team
 *                      -   People
 *          description: Use to to request all users. Model ${modelName}
 *          parameters:
 *              -   in: path
 *                  name: userId
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

    //let foundProduct = data.find(product => product.id === parseInt(requestedId));
    try {
        response.status(200).send(`Desde el ${modelName}Controller: Show ${id}`)
    } catch (error) {
        response.status(500).send({message: e.message})
    }
    /*
    if ( !foundProduct )
    {
        res.status(404).send(`No se encuentra el producto con id ${requestedId}`)
    }
    res.send(foundProduct);
    */
    
}


/**
 * @swagger
 * /api/v1/people/:
 *      post:
 *          tags:
 *              -   Human Resources
 *                  -   Team
 *                      -   People
 *          description: Use to to request all users. Model ${modelName}
 *          parameters:
 *              -   in: path
 *                  name: name
 *                  schema:
 *                  type: integer
 *                  required: true
 *                  description: Numeric ID of the user to get
 *              -   in: path
 *                  name: price
 *                  schema:
 *                  type: integer
 *                  required: true
 *                  description: Numeric ID of the user to get
 *              -   in: path
 *                  name: units
 *                  schema:
 *                  type: integer
 *                  required: true
 *                  description: Numeric ID of the user to get
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
    response.status(200).send(`Desde el ${modelName}Controller: store`)
}

async function update (request, response)
{
    const { id } = request.params;

    /*
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

    */

   response.status(200).send(`Desde el ${modelName}Controller: update con id: ${id}`)
}

async function destroy (request, response)
{
    const { id } = request.params;

   response.status(200).send(`Desde el ${modelName}Controller: destroy con id: ${id}`)
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