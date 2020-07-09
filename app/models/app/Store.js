const mongoose = require('mongoose')
const shortid = require('shortid');

const Schema = mongoose.Schema

/**
 * @swagger
 * components:
 *      schemas:
 *          Store:
 *              type: object
 *              properties:
 *                  sid:
 *                      type: string 
 *                      description: Short id of the object
 *                      readOnly: true
 *                  name:
 *                      type: string 
 *                      description: Name of the product.
 *                  website:
 *                      type: string
 *                      description: Height of the product.
 *                  address:
 *                      type: string
 *                      description: Unitary price product.
 *                  description:
 *                      type: string
 *                      minium: 0
 *                      description: Height of the product.
 */
const modelSchema = Schema({
    name: String,
    sid: {'type': String, 'default': shortid.generate},
    website: String,
    address: String,
    imgURL: String,
    description: String
},{
    timestamps: true
}
)

module.exports = mongoose.model('Store', modelSchema)