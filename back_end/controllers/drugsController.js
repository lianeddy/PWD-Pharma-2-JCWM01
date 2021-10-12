const { db } = require("../database");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = "Select * from product;";
    if (req.query.id_product) {
      scriptQuery = `Select * from product where id_product = ${db.escape(
        req.query.id_product
      )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  addData: (req, res) => {
    console.log(req.body);
    let {
      product_name,
      description,
      product_price,
      stock,
      unit,
      product_image,
      product_image_detail,
      expired_date,
      bottle_volume,
      category,
    } = req.body;
    let insertQuery = `Insert into product values (null, ${db.escape(
      product_name
    )}, ${db.escape(description)}, ${db.escape(product_price)}, ${db.escape(
      stock
    )}, ${db.escape(unit)}, ${db.escape(product_image)}, ${db.escape(
      expired_date
    )}, ${db.escape(bottle_volume)}, ${db.escape(category)});`;
    console.log(insertQuery);
    db.query(insertQuery, (err, results) => {
      if (err) res.status(500).send(err);
      db.query(
        `Select * from obat where product_name = ${db.escape(product_name)};`,
        (err2, results2) => {
          if (err2) res.status(500).send(err2);
          res
            .status(200)
            .send({ message: "Penambahan user berhasil", data: results2 });
        }
      );
    });
  },
  getProduct: (req, res) => {
    let { limit } = req.body;
    let scriptQuery = `select * from product`;
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      console.log(limit);
      console.log(results);
      res.status(200).send(results);
    });
  },
 
};
