const express = require("express");
const { adminController } = require("../controllers");
const routers = express.Router();

routers.get("/sales", adminController.salesReport);
routers.get("/revenue", adminController.countRevenue);

module.exports = routers;
