const express= require('express')
const { productController } = require('../controllers')
const router = express.Router()

router.get('/product-detail/:id', productController.get)

module.exports = router