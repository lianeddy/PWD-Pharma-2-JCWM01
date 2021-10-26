const {db} = require("../database")

module.exports = {

    getCart: (req, res) => {
        let selectQuery = `select c.id_cart,(product_price * cart_qty) as total, u.id_user, u.username, p.id_product, p.stock,(stock div bottle_volume) as bottle_stock, p.bottle_volume, p.product_name, p.product_price, c.cart_qty, p.unit, p.product_image
        from cart c
        left join user u on u.id_user = c.id_user
        left join product p on p.id_product = c.id_product where u.id_user = ${req.params.id};`
        console.log(selectQuery)
    
        db.query(selectQuery, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
    
          res.status(200).json({ results} )
          // res.status(200).send(results)
        })
      },
     
      deleteCart : (req, res) =>{
          let deleteQuery = `delete from cart where id_cart =  ${req.params.id};`
          console.log(deleteQuery);

          db.query(deleteQuery, (err, result) =>{
              if(err){
                  console.log(err)
                  return res.status(500).send(err)
              }
              res.status(200).send({message : "berhasil delete cart"})
          })
      },
      updateQty : (req, res) =>{
          let updateQuery = `update cart set cart_qty = ${req.body.cart_qty} where id_cart = ${req.params.id};`
          console.log(updateQuery);

          db.query(updateQuery, (err, result) =>{
              if(err){
                  console.log(err);
                  return res.status(500).send(err)
              }
              res.status(200).send({message : "berhasil update quantity"})
          })
      },

      subtotalPrice: (req, res) => {
        let selectQuery = `select sum(subtotal) as subtotal from
        (select c.id_cart, (p.product_price * c.cart_qty) as subtotal, u.id_user, u.username
        from cart c
        left join user u on u.id_user = c.id_user
        left join product p on p.id_product = c.id_product where u.id_user = ${req.body.id_user}) as table_a;`
        console.log(selectQuery)

        db.query(selectQuery, (err, results) =>{
          if (err) {
            console.log(err);
            return res.status(500).send(err)
          }
          res.status(200).send({ results, message : "Count Cart Subtotal Price Succeed" })
        })
      },
      payBtnCart: (req, res) => {
        let insertQuery = `INSERT INTO transaction VALUES ${req.body.insertQuery};`
        console.log(insertQuery)

        // let dataInsert = []
  
        // for (let prop in req.body) {
        //   dataInsert.push(`${prop} = ${db.escape(req.body[prop])}`)
        // }
      
        // let updateQuery = `INSERT INTO transaction VALUES ${dataInsert};`
        // console.log(updateQuery)

        db.query(insertQuery, (err, results) =>{
          if (err) {
            console.log(err);
            return res.status(500).send(err)
          }
          res.status(200).send({ results, message : "Insert Cart Data into Transaction Succeed", success: true })
        })
      },
      clearCart: (req, res) => {
        let deleteQuery = `DELETE FROM cart WHERE id_cart in (${req.body.deleteQuery});`
        console.log(deleteQuery)

        db.query(deleteQuery, (err, results) =>{
          if (err) {
            console.log(err);
            return res.status(500).send(err)
          }
          res.status(200).send({ results, message : "Clear Cart After Checkout Succeed", success: true })
        })
      },
      addToCartNew: (req, res) => {
        let insertQuery = `INSERT INTO cart VALUES (null, ${req.params.iduser}, ${req.body.id_product}, ${req.body.cart_qty});`
        console.log(insertQuery)

        db.query(insertQuery, (err, results) =>{
          if (err) {
            console.log(err);
            return res.status(500).send(err)
          }
          res.status(200).send({ results, message : "Insert to Cart Succeed", success: true })
        })
      },
      addToCartPatch: (req, res) => {
        let updateQuery = `UPDATE cart set cart_qty = ${req.body.cart_qty} WHERE id_cart = ${req.body.id_cart};`
        console.log(updateQuery)

        db.query(updateQuery, (err, results) =>{
          if (err) {
            console.log(err);
            return res.status(500).send(err)
          }
          res.status(200).send({ results, message : "Add Quantity to Cart Succeed", success: true })
        })
      },
      getUserCart: (req, res) => {
        let selectQuery = `select *
        from cart c
        left join user u on u.id_user = c.id_user
        left join product p on p.id_product = c.id_product where u.id_user = ${req.params.id};`
        // console.log(selectQuery)
    
        db.query(selectQuery, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
    
          res.status(200).json({ results} )
          // res.status(200).send(results)
        })
      }

}
