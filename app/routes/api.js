const router = require('express').Router();

const productRoutes = require('./Model')('Product')


const extrasUser = [
    { method: 'GET', endpoint: "generatePDF", callback: 'generatePDF'},
    { method: 'GET', endpoint: ":id/pdf", callback: 'generatePDF2'}
]
const userRoutes = require('./Model')('User', extrasUser)


router.use('/products', productRoutes)
router.use('/users', userRoutes)

module.exports = router