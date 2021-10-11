const express = require("express");
const { adminController } = require("../controllers");
const routers = express.Router();

routers.get("/sales", adminController.salesReport);

module.exports = routers;
