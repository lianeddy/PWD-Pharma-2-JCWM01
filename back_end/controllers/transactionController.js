const {db} = require("../database")

module.exports = {
    getTransaction: (req, res) => {
        let scriptQuery = `select * from transaction where id_user = ${db.escape(req.params.id)};`;
        db.query(scriptQuery, (err, results) => {
            if (err){
                console.log(err);
                res.status(500).send(err);
            } 
          res.status(200).send(results);
        });
      },
}