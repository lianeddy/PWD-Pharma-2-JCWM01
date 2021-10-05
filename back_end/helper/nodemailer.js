const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth : {
        //email aktif untuk mengirimkan ke user dalam bentuk gmail
        user: 'pharma2.purwadhika@gmail.com',//pharma2@gmail.com
        pass : 'rrzrregxhmghjxop'
    },
    tls:{
        rejectUnauthorized: false
    }

}
)

module.exports = transporter