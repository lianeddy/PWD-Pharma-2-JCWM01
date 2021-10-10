const express= require('express')
const { uploadController } = require('../controllers')
const route = express.Router()

route.patch('/uploadimg/:id', uploadController.uploadImg)
route.get('/uploadPrescription/:id', uploadController.uploadPrescription)


module.exports = route