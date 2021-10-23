const express= require('express')
const { productController } = require('../controllers')
const router = express.Router()

router.get('/product-detail/:id', productController.getProduct)
router.get('/all-product', productController.getAllProduct)

module.exports = router