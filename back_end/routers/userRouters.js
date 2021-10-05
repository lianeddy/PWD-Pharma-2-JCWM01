const express = require('express')
const { userController } = require('../controllers')
const { auth } = require('../helper/authToken')
const routers = express.Router()

routers.get('/login', userController.getData)
routers.post('/regis', userController.addData)

module.exports = routers