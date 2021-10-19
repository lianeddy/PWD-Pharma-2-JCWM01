const express= require('express')
const { uploadController } = require('../controllers')
const route = express.Router()

route.patch('/uploadimg/:id', uploadController.uploadImg)
route.post('/uploadPrescription/:id', uploadController.uploadPrescription)
route.patch('/uploadPayment/:id', uploadController.uploadPayment)
route.get('/get', uploadController.getProfileImage)


module.exports = route