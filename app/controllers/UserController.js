const e = require('express')

async function index(request, response)
{
    try {
        response.status(200).send("Desde el UserController: index")
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}

async function show(request, response)
{
    
    const requestedId = request.params.id;

    //let foundProduct = data.find(product => product.id === parseInt(requestedId));
    try {
        response.status(200).send("Desde el UserController : show, buscando a " + requestedId)
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
    response.status(200).send("Store desde usuario")
}

async function generatePDF(request, response)
{
    response.status(200).send("Generando pdfs")
}

async function generatePDF2(request, response)
{
    const requestedId = request.params.id;

    //let foundProduct = data.find(product => product.id === parseInt(requestedId));
    try {
        response.status(200).send("Desde el UserController : generatePDF2, buscando a " + requestedId)
    } catch (error) {
        response.status(500).send({message: e.message})
    }
}



async function update (req, res){
    const requestedId = req.params.id;

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

   response.status(200).send("Update desde usuario " + requestedId)
}

async function destroy (request, response){
    const requestedId = request.params.id;

   response.status(200).send("Delete desde usuario " + requestedId)
}

async function muchosParams (request, response){
    

   response.status(200).send( request.params)
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
    destroy,
    generatePDF,
    generatePDF2,
    muchosParams
}