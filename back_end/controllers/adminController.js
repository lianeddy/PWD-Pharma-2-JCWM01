const { db } = require("../database");

module.exports = {
  salesReport: (req, res) => {
    let selectQuery = `SELECT r.id_report, u.id_user, u.username, t.id_transaction, t.id_product, p.product_name, p.product_price, p.unit, t.qty, t.tax, t.total_price, 
    t.date, t.payment_method, t.expedition_name, t.shipping_cost, t.image, t.status, co.id_custom_order, pre.id_prescription
    FROM report r
    LEFT JOIN transaction t on t.id_transaction = r.id_transaction
    LEFT JOIN product p on p.id_product = t.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Sales Report Data Succeed" })
      // res.status(200).send(results)
    })
  },
  countTotalPrice: (req, res) => {
    let selectQuery = `select sum(total_price) as total_price
    FROM report r
    LEFT JOIN transaction t on t.id_transaction = r.id_transaction
    LEFT JOIN product p on p.id_product = t.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Total Price Succeed" })
    })
  },
  countShipping: (req, res) => {
    let selectQuery = `select sum(shipping_cost) as total_shipping
    FROM report r
    LEFT JOIN transaction t on t.id_transaction = r.id_transaction
    LEFT JOIN product p on p.id_product = t.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription
    WHERE t.status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Shipping Cost Succeed" })
    })
  },
  countTotalPriceMonthly: (req, res) => {
    let selectQuery = `SELECT sum(total_price) as total_price FROM pharma2.transaction WHERE MONTH(date) = 10 AND status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Monthly Total Price Succeed" })
    })
  },
  countShippingMonthly: (req, res) => {
    let selectQuery = `SELECT sum(shipping_cost) as shipping_cost FROM pharma2.transaction WHERE MONTH(date) = 10 AND status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Monthly Shipping Cost Succeed" })
    })
  },
  countTax: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax FROM pharma2.transaction;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Tax Succeed" })
    })
  },
  countTaxMonthly: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax FROM pharma2.transaction WHERE MONTH(date) = 10 AND status = 'done';`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Monthly Tax Succeed" })
    })
  },
  countStockPrice: (req, res) => {
    let selectQuery = `SELECT sum(stock_price) as stock_price FROM
    (SELECT admin_price, stock, bottle_volume, (stock div bottle_volume * admin_price) AS 'stock_price' FROM product) AS table_a;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Stock Price Succeed" })
    })
  },
  countRestockPrice: (req, res) => {
    let selectQuery = `SELECT sum(restock_price) AS restock_price FROM
    (SELECT restock_qty, admin_price, (restock_qty * admin_price) AS 'restock_price' FROM restock res
    LEFT JOIN product p ON p.id_product = res.id_product) AS restock_price;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Restock Price Succeed" })
      // res.status(200).json(results)
    })
  },
  countRestockPriceMonthly: (req, res) => {
    let selectQuery = `SELECT sum(restock_price) AS restock_price FROM
    (SELECT restock_qty_bottle, admin_price, (restock_qty_bottle * admin_price) AS 'restock_price', restock_date FROM restock res
    LEFT JOIN product p ON p.id_product = res.id_product
    WHERE MONTH(restock_date) = 10) AS table_a`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Sum Monthly Restock Price Succeed" })
    })
  },
  topSellMg: (req, res) => {
    let selectQuery = `SELECT t.qty, p.product_name FROM transaction t
    LEFT JOIN product p ON p.id_product = t.id_product
    WHERE t.status = 'done' and p.unit = 'mg'
    ORDER BY t.qty desc;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Top Seller mg Unit Succeed" })
    })
  },
  topSellMgMonthly: (req, res) => {
    let selectQuery = `SELECT t.qty, p.product_name FROM transaction t
    LEFT JOIN product p ON p.id_product = t.id_product
    WHERE t.status = 'done' and MONTH(t.date) = 10 and p.unit = 'mg'
    ORDER BY t.qty desc;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Monthly Top Seller mg Unit Succeed" })
    })
  },
  topSellMl: (req, res) => {
    let selectQuery = `SELECT t.qty, p.product_name FROM transaction t
    LEFT JOIN product p ON p.id_product = t.id_product
    WHERE t.status = 'done' and p.unit = 'ml'
    ORDER BY t.qty desc;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Top Seller ml Unit Succeed" })
    })
  },
  topSellMlMonthly: (req, res) => {
    let selectQuery = `SELECT t.qty, p.product_name FROM transaction t
    LEFT JOIN product p ON p.id_product = t.id_product
    WHERE t.status = 'done' and MONTH(t.date) = 10 and p.unit = 'ml'
    ORDER BY t.qty desc;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Monthly Top Seller ml Unit Succeed" })
    })
  },
  topSellBt: (req, res) => {
    let selectQuery = `SELECT t.qty, p.product_name FROM transaction t
    LEFT JOIN product p ON p.id_product = t.id_product
    WHERE t.status = 'done'
    ORDER BY t.qty desc;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Top Seller bottle Unit Succeed" })
    })
  },
  topSellBtMonthly: (req, res) => {
    let selectQuery = `SELECT t.qty, p.product_name FROM transaction t
    LEFT JOIN product p ON p.id_product = t.id_product
    WHERE t.status = 'done' and MONTH(t.date) = 10
    ORDER BY t.qty desc;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Monthly Top Seller bottle Unit Succeed" })
    })
  },
  chartStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost, date, MONTHNAME(date) as month,
    (total_price + shipping_cost) as 'total_revenue', (tax + shipping_cost) as 'total_expenses', (total_price - tax) as 'profit_or_loss'
    FROM transaction WHERE status = 'done' GROUP BY MONTH(date) ORDER BY date ASC;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Monthly Sales Statistic Succeed" })
    })
  },
  pieChartMg:(req, res) => {
    let selectQuery = `SELECT sum(t.qty) as qty, p.product_name FROM transaction t
    LEFT JOIN product p ON p.id_product = p.id_product
    WHERE t.status = 'done' and p.unit = 'mg' and p.id_product IS NOT NULL
    GROUP BY p.product_name
    ORDER BY product_name asc;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Pie Chart mg Unit Succeed" })
    })
  },
  pieChartMl:(req, res) => {
    let selectQuery = `SELECT sum(t.qty) as qty, p.product_name FROM transaction t
    LEFT JOIN product p ON p.id_product = t.id_product
    WHERE t.status = 'done' and p.unit = 'ml' and p.id_product IS NOT NULL
    GROUP BY p.product_name
    ORDER BY product_name asc;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Pie Chart ml Unit Succeed" })
    })
  },
  pieChartBt:(req, res) => {
    let selectQuery = `SELECT sum(t.qty) as qty, p.product_name FROM transaction t
    LEFT JOIN product p ON p.id_product = t.id_product
    WHERE t.status = 'done' AND p.id_product IS NOT NULL
    GROUP BY p.product_name
    ORDER BY product_name asc;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get Pie Chart bottle Unit Succeed" })
    })
  },
  getCustomOrder : (req, res)=>{
    let selectQuery = `select p.id_prescription, u.id_user, username, p.commentar, p.prescription_img 
    from prescription p 
    left join user u on u.id_user = p.id_user limit ${req.params.page}, 4;`
    db.query(selectQuery, (err, results)=>{
      if(err){
        console.log(err);
        return res.status(500).send(err)
      }
      res.status(200).json({results})
    })
  },
  getProduct : (req, res)=>{
    let selectQuery = `select * from product;`
    db.query(selectQuery,(err, results)=>{
      if(err){
        console.log(err);
        return res.status(500).send(err)
      }
      res.status(200).json({results})
    })
  },
  getProductPrice : (req, res)=>{
    let selectQuery = `select product_price from product where id_product = ${req.params.id};`
    
    db.query(selectQuery,(err, results)=>{
      if(err){
        console.log(err);
        return res.status(500).send(err)
      }
      res.status(200).json({results})
    })
  },
  payBtnCustom: (req, res) => {
    let insertQuery = `INSERT INTO transaction VALUES ?;`
    var values = req.body.outputProduct
    console.log(insertQuery)

    db.query(insertQuery, [values], (err, results) =>{
      if (err) {
        console.log(err);
        return res.status(500).send(err)
      }
      res.status(200).send({ results, message : "Insert to transaction", success: true })
    })
  },
  deletePrescription : (req, res)=>{
    let deleteQuery = `delete from prescription where id_prescription = ${req.params.id}`
    db.query(deleteQuery,(err, results)=>{
      if(err){
        console.log(err);
        return res.status(500).send(err)
      }
      res.status(200).json({results})
    })
  }, 
  getProductUsage : (req, res)=>{
    let selectQuery = `SELECT t.id_transaction,p.product_price, SUM(qty) as total_qty, t.status, p.product_name, p.product_image, p.stock ,p.unit, p.id_product, id_prescription
                      FROM transaction t
                      left join product p on p.id_product = t.id_product  WHERE id_prescription IS NOT NULL and t.status = "shipping" group by id_product limit ${req.params.page}, 3 ;`
    
    db.query(selectQuery,(err, results)=>{
      if(err){
        console.log(err);
        return res.status(500).send(err)
      }
      res.status(200).json({results})
    })
  }


}