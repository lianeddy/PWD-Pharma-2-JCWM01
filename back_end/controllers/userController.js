const { db } = require('../database')
const {createToken} = require('../helper/createToken')
const Crypto = require('crypto')
const transporter = require('../helper/nodemailer')

module.exports = {
  getData: (req, res) => {
    req.body.password = Crypto.createHmac("sha1", "hash123").update(req.body.password).digest("hex")
    let scriptQuery = `select * from user where email = ${db.escape(req.body.email)} and password = ${db.escape(req.body.password)};`

        db.query(scriptQuery,(err, results) =>{
            if(err) res.status(500).send(err)
            if(results[0]){
                let {username, email,password, address, phone_number, fullname, gender, age, profile_picture, role, status} = results[0]
                let token =  createToken({username, email,password, address, phone_number, fullname, gender, age, profile_picture, role, status})
                if(status != "verified"){
                    res.status(200).send({message: "your account not verified"})
                }else{
                    res.status(200).send({dataLogin : results[0], token, message : "login success"})
                }
            }
            
           
        })
    
    },
    addData : (req, res)=>{
        console.log(req.body);
        let {username, email, password, address, phone_number, fullname, gender, age, profile_picture} = req.body
        password = Crypto.createHmac("sha1","hash123").update(password).digest("hex")
        console.log(password);
        let insertQuery = `insert into user values(
            null,
             ${db.escape(username)},
            ${db.escape(email)},
            ${db.escape(password)},
            ${db.escape(address)},
            ${db.escape(phone_number)},
            ${db.escape(fullname)},
            ${db.escape(gender)},
            ${db.escape(age)},
            ${db.escape(profile_picture)},
             'user',
              'unverified'
              );`
        console.log(insertQuery);
        db.query(insertQuery,(err, results)=>{
            if(err){
                console.log(err);
                res.status(500).send(err)
            }
            console.log(results);
            if(results.insertId){
                let sqlGet = `select * from user where id_user = ${results.insertId};`
                db.query(sqlGet,(err2, results2)=>{
                    if(err2){
                        console.log(err2);
                        res.status(500).send(err2)
                    }
                    //bahantoken
                    let {id_user, username, email,password, address, phone_number, fullname, gender, age, profile_picture, role, status} = results2[0]
                    //buat token
                    let token = createToken({id_user, username, email,password, address, phone_number, fullname, gender, age, profile_picture, role, status})

                    let mail = {
                        from : 'admin <sodikin.purwadhika@gmail.com>',
                        to : `${email}`,
                        subject : 'verification account',
                        html: `<a href='http://localhost:3000/authentication/${token}'>click here for verification your account</a>`
                    }
                    transporter.sendMail(mail,(errMail, resMail)=>{
                        if(errMail){
                            console.log(errMail);
                            res.status(500).send({Message:"registration fail ", success: false, err:errMail})
                        }
                        res.status(200).send({Message:"registration succes check your email", success: true})
                    })

                })

            }
           
        })
    },
    verification:(req,res)=>{
        let updateQuery = `Update user set status = 'verified' where id_user = ${req.user.id_user};`
        
        db.query(updateQuery,(err, result)=>{
            if(err){
                console.log(err);
                res.status(500).send(err)
            }
            res.status(200).send({message: "verified account", success: true})
        })
    },
    editData :(req, res)=>{
        let dataUpdate = []
        for(let prop in req.body){
            dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
        }
    
        let updateQuery = `update user set ${dataUpdate} where id_user = ${req.params.id};`
        console.log(updateQuery);
        db.query(updateQuery,(err, results) =>{
            if(err)res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    deleteData : (req, res)=>{
        let deleteQuery = `delete from user where id_user = ${db.escape(req.params.id_user)};`
        db.query(deleteQuery,(err, results)=>{
            if(err)res.status(500).send(err)
            res.status(200).send(results)
        })
    
    }

}