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
        left join product p on p.id_product = c.id_product where u.id_user = 3 and p.unit = 'bottle') as table_a;`
        console.log(selectQuery)

        db.query(selectQuery, (err, results) =>{
          if(err){
              console.log(err);
              return res.status(500).send(err)
          }
          res.status(200).send({ results, message : "Count Cart Subtotal Price Succeed" })
        })
      }

}
