const express = require("express");
const { userController } = require("../controllers");
const { auth } = require("../helper/authToken");
const routers = express.Router();

//routers.get("/fetchProduct", userController.fetchProduct);
routers.get("/getProduct", userController.getProduct);

routers.post("/login", userController.getData);
routers.post("/register", userController.addData);
routers.patch("/edit", userController.editData);
routers.patch("/verified", auth, userController.verification);

module.exports = routers;
