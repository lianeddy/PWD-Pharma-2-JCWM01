const {db} = require("../database")

module.exports = {
  getProduct: (req, res) => {
    let selectQuery = `SELECT * FROM product WHERE id_product = ${req.params.id};`
    // console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results} )
    })
  },
  getAllProduct: (req, res) => {
    let selectQuery = `SELECT * FROM product;`
    console.log(selectQuery)

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.status(200).json({ results} )
    })
  }
}
