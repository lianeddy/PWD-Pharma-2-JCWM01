const express = require('express')
const { userController } = require('../controllers')
const { auth } = require('../helper/authToken')
const routers = express.Router()

routers.post('/login', userController.getData)
routers.post('/regis', userController.addData)
routers.patch('/change/:id', userController.changePassword)
routers.post('/reset-email', userController.resetEmailPass)
routers.patch('/resetpass/:id', userController.resetPass)

module.exports = routers