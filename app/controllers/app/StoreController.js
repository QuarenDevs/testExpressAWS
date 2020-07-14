const e = require('express')
//const { models } = require('../../../models')
const Store = require('../../models/app/Store')
const modelName = "Store"

/**
 * @swagger
 * /api/v1/stores/:
 *      get:
 *          tags:
 *              -   App
 *                  -   Store
 *          description: Use to to request all stores. Model Store
 *          responses:
 *              '200':
 *                  description: A successful response
 */
async function index(request, response)
{
    try {
        const stores = await Store.find().lean().exec()

        response.status(200).send({
            "success":"true",
            "message": "Stores have been retrieved succesfully",
            "data": stores
        })
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}


/**
 * @swagger
 * /api/v1/stores/{id}:
 *      get:
 *          tags:
 *              -   App
 *                  -   Store
 *          description: Use to to request the store with the given id. Model Store
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

    let foundStore = await findByShortId(request, response, id)
    
    if( foundStore != undefined)
    {
        response.send({
            "success":"true",
            "message": `Store with id ${id} has been retrieved succesfully`,
            "data": foundStore
        });
    }
}

/**
 * @swagger
 * /api/v1/stores/:
 *      post:
 *          tags:
 *              -   App
 *                  -   Store
 *          summary: Add a new store to the store
 *          description: Add a new Store to the store
 *          requestBody:
 *              description: Store object that needs to be added to the store
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Store'
 *                  text/plain:
 *                      schema:
 *                          type: string
 *              required: true
 *          responses:
 *              '200':
 *                  description: A successful response
 *          x-codegen-request-body-name: body
 */
async function store(request, response)
{
    /*
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number(),
        units: Joi.number().integer()
    });

    const {error} = validateStore(req.body);

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

        const newStore = Store({
            name,
            size,
            unitaryPrice,
            description
        })

        //newStore.save()

        response.status(200).send(newStore)
    } catch (error) {
        response.status(500).send({message: e.message})
    }*/

    
    const newStore = Store(request.body)

    newStore.save()

    response.status(200).send({
        "success":"true",
        "message": `The new store has been saved succesfully`,
        "data": newStore
    })
}


/**
 * @swagger
 * /api/v1/stores/{id}:
 *      put:
 *          tags:
 *              -   App
 *                  -   Store
 *          description: Use to to update the store with the given id. Model Store
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                  type: integer
 *                  required: true
 *                  description: Numeric ID of the user to get
 *          requestBody:
 *              description: Store object that needs to be added to the store
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Store'
 *                  text/plain:
 *                      schema:
 *                          type: string
 *              required: true
 *          responses:
 *              '200':
 *                  description: A successful response
 */
async function update (request, response)
{
    const { id } = request.params;

    let foundStore = await findByShortId(request, response, id)

    /*
    const {error} = validateStore(req.body);

    if(error)
    {
        res.status(400).send(validation.error.details)
    }
    

    const requestedName = req.body.name;
    const requestedPrice = req.body.price;
    const requestedUnits = req.body.units;
    

    foundStore.name = requestedName;
    foundStore.price = requestedPrice;
    foundStore.units = requestedUnits;
   */

    if ( foundStore != undefined )
    {
        const { name, size, unitaryPrice, description} = request.body
        foundStore.name = name
        foundStore.size = size
        foundStore.unitaryPrice = unitaryPrice
        foundStore.description = description

        foundStore.save()

        response.status(200).send({
            "success":"true",
            "message": `Store with id ${id} has been updated succesfully`,
            "data": foundStore
        });
    }


    

}

/**
 * @swagger
 * /api/v1/stores/{id}:
 *      delete:
 *          tags:
 *              -   App
 *                  -   Store
 *          description: Use to to update the store with the given id. Model Store
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

    //let foundStore = await findByShortId(request, response, id)
    
    //if ( foundStore != undefined )
    {
        const result = await Store.remove({sid: id})

        response.status(200).send({
            "success":"true",
            "message": `Store with id ${id} has been deleted succesfully`,
            "data": result
        });
    }

}

async function findByShortId(request, response, id)
{
    let foundStore = await Store.findOne({sid: id})
    
    if ( !foundStore )
    {
        response.status(404).send({error: 404, message:`No se encuentra el producto con id ${id}`})
        return undefined
    }

    return foundStore
}
function validateStore(store){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number(),
        units: Joi.number().integer()
    });

    return Joi.validate(store, schema);  
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