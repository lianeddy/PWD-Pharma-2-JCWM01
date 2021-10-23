const express= require('express')
const { cartController } = require('../controllers')
const route = express.Router()



route.get('/getCart/:id', cartController.getCart)
route.delete('/deleteCart/:id', cartController.deleteCart)
route.patch('/updateQty/:id',cartController.updateQty)
route.post('/subtotal-price', cartController.subtotalPrice)
route.post('/pay', cartController.payBtnCart)
route.patch('/clear-cart', cartController.clearCart)
route.post('/add-cart/:iduser', cartController.addToCartNew)
route.patch('/patch-cart', cartController.addToCartPatch)
route.get('/get-user-cart/:id', cartController.getUserCart)



module.exports = route