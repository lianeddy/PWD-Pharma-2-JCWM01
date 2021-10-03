//decoding untuk menerjemahkan token dari FE ke BE
const jwt = require('jsonwebtoken')

module.exports={
    //middleware
    //authentication mengirim token ke email menggunakan nodemailer
    auth:(req, res, next)=>{
        jwt.verify(req.token, "pharma123", (err,decode)=>{
            if(err){
                return res.status(401).send("user not auth")
            }
            //diteruskan ke user controller
            req.user = decode

            next()
        })

    }

}