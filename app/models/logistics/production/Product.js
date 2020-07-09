const mongoose = require('mongoose')
//var shortid = require('shortid');

const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: String,
    //sid: {'type': String, 'default': shortid.generate},
    size: Number,
    unitaryPrice: Number,
    imgURL: String,
    description: String
},{
    timestamps: true
}
)

module.exports = mongoose.model('Products', ProductSchema)