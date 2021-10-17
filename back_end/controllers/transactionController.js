const {db} = require("../database")

module.exports = {
    getTransaction: (req, res) => {
        let scriptQuery = `SELECT id_transaction, id_user, qty, tax, date, expedition_name, shipping_cost, id_cart, status, total_price, (total_price + tax + shipping_cost ) as final_price FROM pharma2.transaction where id_user = ${db.escape(req.params.id)}  order by date asc  ; `;
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
            id_cart,
            status,
            total_price,
            (total_price + tax + shipping_cost ) as final_price FROM pharma2.transaction where id_user = ${db.escape(req.params.id)} and status = ${db.escape(req.params.status)}  order by date asc  ; `;
        
        db.query(scriptQuery, (err, results) => {
            if (err){
                console.log(err);
                res.status(500).send(err);
            } 
          res.status(200).send(results);
        });
      },
}