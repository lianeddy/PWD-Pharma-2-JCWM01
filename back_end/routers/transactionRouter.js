const express= require('express')
const { transactionController } = require('../controllers')
const route = express.Router()


route.get('/getTransaction/:id', transactionController.getTransaction)




module.exports = route