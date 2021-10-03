const mysql = require('mysql')


const db = mysql.createConnection({
    host :'localhost',
    user :'root',
    password : 'dikin',
    database : 'pharma2',
    port : 3306,
    multipleStatements : true,
    insecureAuth : true
})

db.connect((err)=>{
    if(err){
        return console.log(`error : ${err.message}`);
    }
    console.log('connected to mysql server');

})


module.exports= { db }