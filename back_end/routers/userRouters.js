const express = require("express");
const { userController } = require("../controllers");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.post("/login", userController.getData);
routers.patch("/change/:id", userController.changePassword);
routers.post("/reset-email", userController.resetEmailPass);
routers.patch("/resetpass/:id", userController.resetPass);
routers.post("/register", userController.addData);
routers.patch("/edit", userController.editData);
routers.patch("/verified", auth, userController.verification);

module.exports = routers;
