const express = require("express");
const { drugsController } = require("../controllers");
const routers = express.Router();

routers.get("/get", drugsController.getData);
routers.post("/add-product", drugsController.addData);
module.exports = routers;
