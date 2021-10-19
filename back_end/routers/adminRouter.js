const express = require("express");
const { adminController } = require("../controllers");
const routers = express.Router();

routers.get("/sales", adminController.salesReport);
routers.get("/revenue", adminController.countRevenue);
routers.get("/getAdminTransaction/:page/:field/:ordered", adminController.getAdminTransaction);
routers.get("/getAdminTransactionFilter/:page/:field/:ordered/:status", adminController.getAdminTransactionFilter);

module.exports = routers;
