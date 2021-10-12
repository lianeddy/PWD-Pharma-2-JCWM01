const { db } = require("../database");

module.exports = {
  salesReport: (req, res) => {
    let selectQuery = `SELECT u.id_user, u.username, t.id_transaction, p.product_name, p.product_price, p.unit, t.qty, t.tax, t.total_price, 
    t.date, t.payment_method, t.expedition_name, t.shipping_cost, t.image, t.status, c.id_cart, co.id_custom_order, pre.id_prescription
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription;`
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
  countRevenue: (req, res) => {
    let selectQuery = `select sum(total_price) as total_revenue
    FROM report r
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
    LEFT JOIN custom_order co on co.id_custom_order = t.id_custom_order
    LEFT JOIN prescription pre on pre.id_prescription = co.id_prescription;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Count Revenue Succeed" })
    })
  }
}
