const express = require("express");
const { drugsController } = require("../controllers");
const routers = express.Router();

routers.get("/get", drugsController.getProduct);
routers.get("/get-category", drugsController.getCategory);
routers.get("/get-max-page", drugsController.getMaxPage);
routers.get("/get-product-detail", drugsController.getProductDetail);


module.exports = routers;


// routers.post("/add-product", drugsController.addProduct);
// routers.patch('/edit-product/:id', drugsController.editProduct);
// routers.delete('/delete-product/:id_product', drugsController.deleteProduct);