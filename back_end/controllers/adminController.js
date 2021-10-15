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
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
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
    LEFT JOIN  transaction_product tp on r.id_transaction_product = tp.id_transaction_product
    LEFT JOIN transaction t on t.id_transaction = tp.id_transaction
    LEFT JOIN product p on p.id_product = tp.id_product
    LEFT JOIN user u on u.id_user = t.id_user
    LEFT JOIN cart c on c.id_cart = t.id_cart
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
    (SELECT admin_price, stock, (admin_price * stock) AS 'stock_price' FROM product) AS stock_price;`
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
    (SELECT restock_qty, admin_price, (restock_qty * admin_price) AS 'restock_price', restock_date FROM restock res
    LEFT JOIN product p ON p.id_product = res.id_product
    WHERE MONTH(restock_date) = 10) AS restock_price;`
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
    LEFT JOIN cart c ON c.id_cart = t.id_cart
    LEFT JOIN product p ON p.id_product = c.id_product
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
    LEFT JOIN cart c ON c.id_cart = t.id_cart
    LEFT JOIN product p ON p.id_product = c.id_product
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
    LEFT JOIN cart c ON c.id_cart = t.id_cart
    LEFT JOIN product p ON p.id_product = c.id_product
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
    LEFT JOIN cart c ON c.id_cart = t.id_cart
    LEFT JOIN product p ON p.id_product = c.id_product
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
    LEFT JOIN cart c ON c.id_cart = t.id_cart
    LEFT JOIN product p ON p.id_product = c.id_product
    WHERE t.status = 'done' and p.unit = 'bottle'
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
    LEFT JOIN cart c ON c.id_cart = t.id_cart
    LEFT JOIN product p ON p.id_product = c.id_product
    WHERE t.status = 'done' and MONTH(t.date) = 10 and p.unit = 'bottle'
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
  januaryStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost,
    sum(total_revenue) as total_revenue, sum(total_expenses) as total_expenses, sum(profit_or_loss) as profit_or_loss FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses', (total_revenue - total_expenses) as 'profit_or_loss' FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses'
    FROM transaction WHERE MONTH(date) = 01 AND status = 'done') AS table_a) AS table_b;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get January Sales Statistic Succeed" })
    })
  },
  februaryStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost,
    sum(total_revenue) as total_revenue, sum(total_expenses) as total_expenses, sum(profit_or_loss) as profit_or_loss FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses', (total_revenue - total_expenses) as 'profit_or_loss' FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses'
    FROM transaction WHERE MONTH(date) = 02 AND status = 'done') AS table_a) AS table_b;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get February Sales Statistic Succeed" })
    })
  },
  marchStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost,
    sum(total_revenue) as total_revenue, sum(total_expenses) as total_expenses, sum(profit_or_loss) as profit_or_loss FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses', (total_revenue - total_expenses) as 'profit_or_loss' FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses'
    FROM transaction WHERE MONTH(date) = 03 AND status = 'done') AS table_a) AS table_b;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get March Sales Statistic Succeed" })
    })
  },
  aprilStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost,
    sum(total_revenue) as total_revenue, sum(total_expenses) as total_expenses, sum(profit_or_loss) as profit_or_loss FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses', (total_revenue - total_expenses) as 'profit_or_loss' FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses'
    FROM transaction WHERE MONTH(date) = 04 AND status = 'done') AS table_a) AS table_b;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get April Sales Statistic Succeed" })
    })
  },
  mayStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost,
    sum(total_revenue) as total_revenue, sum(total_expenses) as total_expenses, sum(profit_or_loss) as profit_or_loss FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses', (total_revenue - total_expenses) as 'profit_or_loss' FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses'
    FROM transaction WHERE MONTH(date) = 05 AND status = 'done') AS table_a) AS table_b;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get May Sales Statistic Succeed" })
    })
  },
  juneStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost,
    sum(total_revenue) as total_revenue, sum(total_expenses) as total_expenses, sum(profit_or_loss) as profit_or_loss FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses', (total_revenue - total_expenses) as 'profit_or_loss' FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses'
    FROM transaction WHERE MONTH(date) = 06 AND status = 'done') AS table_a) AS table_b;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get June Sales Statistic Succeed" })
    })
  },
  julyStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost,
    sum(total_revenue) as total_revenue, sum(total_expenses) as total_expenses, sum(profit_or_loss) as profit_or_loss FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses', (total_revenue - total_expenses) as 'profit_or_loss' FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses'
    FROM transaction WHERE MONTH(date) = 07 AND status = 'done') AS table_a) AS table_b;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get July Sales Statistic Succeed" })
    })
  },
  augustStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost,
    sum(total_revenue) as total_revenue, sum(total_expenses) as total_expenses, sum(profit_or_loss) as profit_or_loss FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses', (total_revenue - total_expenses) as 'profit_or_loss' FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses'
    FROM transaction WHERE MONTH(date) = 08 AND status = 'done') AS table_a) AS table_b;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get August Sales Statistic Succeed" })
    })
  },
  septemberStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost,
    sum(total_revenue) as total_revenue, sum(total_expenses) as total_expenses, sum(profit_or_loss) as profit_or_loss FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses', (total_revenue - total_expenses) as 'profit_or_loss' FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses'
    FROM transaction WHERE MONTH(date) = 09 AND status = 'done') AS table_a) AS table_b;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get September Sales Statistic Succeed" })
    })
  },
  octoberStats: (req, res) => {
    let selectQuery = `SELECT sum(tax) as tax, sum(total_price) as total_price, sum(shipping_cost) as shipping_cost,
    sum(total_revenue) as total_revenue, sum(total_expenses) as total_expenses, sum(profit_or_loss) as profit_or_loss FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses', (total_revenue - total_expenses) as 'profit_or_loss' FROM
    (SELECT id_transaction, tax, total_price, date, shipping_cost, (total_price + shipping_cost) as 'total_revenue',
    (tax + shipping_cost) as 'total_expenses'
    FROM transaction WHERE MONTH(date) = 10 AND status = 'done') AS table_a) AS table_b;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results, message: "Get October Sales Statistic Succeed" })
    })
  },
}




// SELECT sum(qty) as qty_paracetamol_mg FROM
// (SELECT * FROM left_join_many WHERE product_name = 'paracetamol' AND unit = 'mg') as table_a;

// SELECT sum(qty) as qty_ibuprofen_mg FROM
// (SELECT * FROM left_join_many WHERE product_name = 'ibuprofen' AND unit = 'mg') as table_a;

// SELECT sum(qty) as qty_valium_mg FROM
// (SELECT * FROM left_join_many WHERE product_name = 'valium' AND unit = 'mg') as table_a;

// SELECT sum(qty) as qty_amoxicillin_mg FROM
// (SELECT * FROM left_join_many WHERE product_name = 'amoxicillin' AND unit = 'mg') as table_a;

// SELECT sum(qty) as qty_paracetamol_ml FROM
// (SELECT * FROM left_join_many WHERE product_name = 'paracetamol' AND unit = 'ml') as table_a;

// SELECT sum(qty) as qty_ibuprofen_ml FROM
// (SELECT * FROM left_join_many WHERE product_name = 'ibuprofen' AND unit = 'ml') as table_a;

// SELECT sum(qty) as qty_valium_ml FROM
// (SELECT * FROM left_join_many WHERE product_name = 'valium' AND unit = 'ml') as table_a;

// SELECT sum(qty) as qty_amoxicillin_ml FROM
// (SELECT * FROM left_join_many WHERE product_name = 'amoxicillin' AND unit = 'ml') as table_a;

// SELECT sum(qty) as qty_paracetamol_bottle FROM
// (SELECT * FROM left_join_many WHERE product_name = 'paracetamol' AND unit = 'bottle') as table_a;

// SELECT sum(qty) as qty_ibuprofen_bottle FROM
// (SELECT * FROM left_join_many WHERE product_name = 'ibuprofen' AND unit = 'bottle') as table_a;

// SELECT sum(qty) as qty_valium_bottle FROM
// (SELECT * FROM left_join_many WHERE product_name = 'valium' AND unit = 'bottle') as table_a;

// SELECT sum(qty) as qty_amoxicillin_bottle FROM
// (SELECT * FROM left_join_many WHERE product_name = 'amoxicillin' AND unit = 'bottle') as table_a;