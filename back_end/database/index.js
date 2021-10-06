const mysql = require('mysql')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dikin",
  database: "pharma2",
  port: 3306,
  multipleStatements: true,
})

db.connect((err) => {
  if (err) {
    return console.error(`error : ${err.message}`)
  }

  console.log(`Connected to MySQL Server`)
})

module.exports = { db }