const { db } = require("../database");

module.exports = {

  getProduct : (req, res) => {
    const limit = 6;
    console.log(req.query.product_name)
    
    let scriptQuery = `Select * from product where product_name like '%${req.query.product_name}%'
    limit ${limit} offset ${req.query.page*limit}`
  
    let sort = ""

    switch (req.query.sortby) {
      case "name_asc":
        sort = "order by product_name asc"
        break;
          case "name_desc":
        sort = "order by product_name desc"
        break;
        case "price_asc":
        sort = "order by product_price asc"
        break;
        case "price_desc":
        sort = "order by product_price desc"
        break;
        default:
          sort = ""

    }

    scriptQuery = `Select * from pharma2.product where product_name like '%${req.query.product_name}%'
    ${sort}
    limit ${limit} offset ${req.query.page*limit};`

      if (req.query.category){
        scriptQuery = `select * from pharma2.product where category = ${db.escape(category)} and product_name like '%${req.query.product_name}%'
        ${sort}
        limit ${limit} offset ${req.query.page * limit};`

      } 

    

    db.query(scriptQuery, (err, results) => {
      if(err) {
        return res.status(500).send(err)
      } else {
        return res.status(200).send(results)
      }
    })

},

  getCategory : (req, res) => {
    let scriptQuery = `select category from product group by category;`

    if(req.query.id_product) {
      scriptQuery = `select category from product group by category
      where product_name = ${db.escape(req.query.product_name)}`
    }

    if(req.query.product_name){
              scriptQuery = `select category from products group by category
              where product_name = ${db.escape(req.query.product_name)}`
  }

  db.query(scriptQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err)

    } else {
      return res.status(200).send(results)
    }
  })
  },

  getMaxPage: (req,res) => {
      let scriptQuery = `select count(id_product) as sumProduct product
      where product_name like '%${req.query.product_name}%';`
      
      
      if(req.query.category){
        if(req.query.category){
              scriptQuery = `select count(product_id) as sumProduct from product
              where category = ${db.escape(req.query.category)} and product_name like '%${req.query.product_name}%';` 
              
          } else if (req.query.category){
              scriptQuery = `select count(product_id) as sumProduct from product
              where category = ${db.escape(req.query.category)} and product_name like '%${req.query.product_name}%';` 

            }

      }

      db.query(scriptQuery, (err, results)=> {
          if (err) {
              return res.status(500).send(err)
          } else {
              return res.status(200).send(results)
          }
      })
      },

  getProductDetail: (req,res) => {
    
    let scriptQuery = `select * from pharma2.product where id_product = ${req.query.id_product};`
    
    db.query(scriptQuery, (err, results)=> {
        if (err) {
            return res.status(500).send(err)
          } else {
            return res.status(200).send(results)
        }
    })
},


};













  // addProduct : (req, res) => {
  //   console.log(req.body);
  //   let {
  //     product_name,
  //     description,
  //     product_price,
  //     stock,
  //     unit,
  //     product_image,
  //     product_image_detail,
  //     expired_date,
  //     bottle_volume,
  //     category,
  //   } = req.body;
  //   let insertQuery = `Insert into product values (null, ${db.escape(
  //     product_name
  //   )}, ${db.escape(description)}, ${db.escape(product_price)}, ${db.escape(
  //     stock
  //   )}, ${db.escape(unit)}, ${db.escape(product_image)}, ${db.escape(product_image_detail)} ${db.escape(
  //     expired_date
  //   )}, ${db.escape(bottle_volume)}, ${db.escape(category)});`;
  //   console.log(insertQuery);
  //   db.query(insertQuery, (err, results) => {
  //     if (err) res.status(500).send(err);
  //     db.query(
  //       `Select * from obat where product_name = ${db.escape(product_name)};`,
  //       (err2, results2) => {
  //         if (err2) res.status(500).send(err2);
  //         res
  //         .status(200)
  //           .send({ message: "Add product success", data: results2 });
  //       }
  //     );
  //   });
  // },
  
  // editProduct : (req,res) => {
  //  letdataUpdate = []
  //  for(let prop in req.body) {
  //    dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
  //   }
  
  //  let updateQuery = `UPDATE product set ${dataUpdate} where id_product = ${req.params.id};`
  //  console.log(updateQuery)
  //  db.query(updateQuery, (err, results) => {
  //    if (err) res.status(500).send(err)
  // res.status(200).send(results)
  //  })
  // },
  
  // deleteProduct : (req, res) => {
  //  let deleteQuery = `DELETE from product where id_product = ${db.escape(req.params.id_product)}`
  
  //  db.query(deleteQuery,(err,results) => {
  //  if (err) res.status(500).send(err)
  // }) 
  // },