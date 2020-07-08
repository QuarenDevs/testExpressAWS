const mongoose = require('mongoose')
var shortid = require('shortid');

const Schema = mongoose.Schema

/**
 * @swagger
 * components:
 *      schemas:
 *          Customer:
 *              type: object
 *              properties:
 *                  sid:
 *                      type: string 
 *                      description: Short id of the object
 *                  name:
 *                      type: string 
 *                      description: Name of the product.
 *                  size:
 *                      type: number
 *                      minium: 0
 *                      description: Height of the product.
 *                  unitaryPrice:
 *                      type: number
 *                      minium: 0
 *                      description: Unitary price product.
 *                  description:
 *                      type: 
 *                      minium: 0
 *                      description: Height of the product.
 */
const ModelSchema = Schema({
    name: String,
    sid: {'type': String, 'default': shortid.generate},
    size: Number,
    unitaryPrice: Number,
    imgURL: String,
    description: String
},{
    timestamps: true
}
)

module.exports = mongoose.model('Product', ModelSchema)