const express = require("express");
const { adminController } = require("../controllers");
const routers = express.Router();

routers.get("/sales", adminController.salesReport);
routers.get("/total-price", adminController.countTotalPrice);
routers.get("/shipping", adminController.countShipping);
routers.get("/total-price-monthly", adminController.countTotalPriceMonthly);
routers.get("/shipping-monthly", adminController.countShippingMonthly);
routers.get("/tax", adminController.countTax);
routers.get("/tax-monthly", adminController.countTaxMonthly);
routers.get("/stock-price", adminController.countStockPrice);
routers.get("/restock-price", adminController.countRestockPrice);
routers.get("/restock-price-monthly", adminController.countRestockPriceMonthly);

routers.get("/mg", adminController.topSellMg);
routers.get("/mg-monthly", adminController.topSellMgMonthly);
routers.get("/ml", adminController.topSellMl);
routers.get("/ml-monthly", adminController.topSellMlMonthly);
routers.get("/bottle", adminController.topSellBt);
routers.get("/bottle-monthly", adminController.topSellBtMonthly);

routers.get("/january-stats", adminController.januaryStats);
routers.get("/february-stats", adminController.februaryStats);
routers.get("/march-stats", adminController.marchStats);
routers.get("/april-stats", adminController.aprilStats);
routers.get("/may-stats", adminController.mayStats);
routers.get("/june-stats", adminController.juneStats);
routers.get("/july-stats", adminController.julyStats);
routers.get("/august-stats", adminController.augustStats);
routers.get("/september-stats", adminController.septemberStats);
routers.get("/october-stats", adminController.octoberStats);

module.exports = routers;
