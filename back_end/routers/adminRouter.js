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

routers.get("/confirm-reject", adminController.confirmReject);
routers.patch("/confirm/:id", adminController.confirmTransaction);
routers.patch("/reject/:id", adminController.rejectTransaction);
routers.patch("/stock-decrease/:id", adminController.stockDecrease);
routers.get("/admin-stock/:page", adminController.adminStock);
routers.get('/custom-order/:page', adminController.getCustomOrder)
routers.get('/get-product', adminController.getProduct)
routers.get('/get-product-price/:id', adminController.getProductPrice)
routers.get('/get-product-usage/:page', adminController.getProductUsage)
routers.post('/pay-custom', adminController.payBtnCustom)
routers.delete('/delete-prescription/:id', adminController.deletePrescription)

module.exports = routers;
