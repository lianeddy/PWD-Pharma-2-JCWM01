const {db} = require("../database")

module.exports = {
    getTransaction: (req, res) => {
      
        let scriptQuery = `SELECT id_transaction, id_user, SUM(qty) as total_qty, tax, date, expedition_name, shipping_cost, status, sum(total_price)as total_tp, sum((total_price + tax + shipping_cost )) as final_price FROM
        pharma2.transaction where id_user = ${db.escape(req.params.id)} group by date  order by date desc limit ${req.params.page}, 5; `
        db.query(scriptQuery, (err, results) => {
            if (err){
                console.log(err);
                res.status(500).send(err);
            } 
          res.status(200).send(results);
        });
      },
      getTransactionFilter: (req, res) => {
        let scriptQuery = `SELECT id_transaction,
            id_user,
            qty,
            tax,
            date,
            expedition_name,
            shipping_cost,
            status,
            total_price,
            (total_price + tax + shipping_cost ) as final_price FROM pharma2.transaction where id_user = ${db.escape(req.params.id)} and status = ${db.escape(req.params.status)} group by minute(date)  order by date asc  ; `;
        
        db.query(scriptQuery, (err, results) => {
            if (err){
                console.log(err);
                res.status(500).send(err);
            } 
          res.status(200).send(results);
        });
      },
      getHistoryProduct : (req, res)=>{
        let scriptQuery = `select t.id_transaction,
        p.id_product,
        t.id_user,
        p.product_name,
        p.product_image,
        t.qty
        from transaction t
        left join product p on p.id_product = t.id_product
        where date = ${db.escape(req.params.date)};`

        db.query(scriptQuery, (err, result)=>{
          if(err){
            console.log(err);
            res.status(500).send(err)
          }
          res.status(200).send(result)
        })
      }
}