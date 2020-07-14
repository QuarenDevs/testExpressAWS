const mongoose = require('mongoose')
const shortid = require('shortid');

const Schema = mongoose.Schema

/**
 * @swagger
 * components:
 *      schemas:
 *          Asset:
 *              type: object
 *              properties:
 *                  sid:
 *                      type: string 
 *                      description: Short id of the object
 *                      readOnly: true
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
 *                      type: string
 *                      minium: 0
 *                      description: Height of the product.
 */
const AssetSchema = Schema({
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


const modelPath = __filename.split("\\")
const modelName = modelPath[modelPath.length - 1].replace(".js", "")
module.exports = mongoose.model(modelName, AssetSchema)