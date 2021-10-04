const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth : {
        //email aktif untuk mengirimkan ke user dalam bentuk gmail
        user: 'sodikin.purwadhika@gmail.com',//pharma2@gmail.com
        pass : 'wxozffegxtoiuwmn'
    },
    tls:{
        rejectUnauthorized: false
    }

}
)

module.exports = transporter