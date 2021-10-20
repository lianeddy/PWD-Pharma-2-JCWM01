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

routers.get("/chart-stats", adminController.chartStats);
routers.get("/piechart-mg", adminController.pieChartMg);
routers.get("/piechart-ml", adminController.pieChartMl);
routers.get("/piechart-bt", adminController.pieChartBt);

routers.get('/custom-order', adminController.getCustomOrder)
routers.get('/get-product', adminController.getProduct)

module.exports = routers;
