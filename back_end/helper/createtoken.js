//encoding untuk membuat secret token
const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (payload) =>{
        return jwt.sign(payload, "pharma123",{
            //kurun waktu token
            expiresIn: '12h'
        })
    }
}