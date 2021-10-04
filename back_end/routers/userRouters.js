const express = require('express')
const {usersController} = require('../controllers')
const {auth} = require('../helper/authToken')
const routers = express.Router()


routers.post('/regis', usersController.addData)


module.exports = routers