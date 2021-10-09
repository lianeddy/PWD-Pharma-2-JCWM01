const multer = require('multer')
const fs = require('fs')

module.exports = {
    uploader : (directory, fileNamePrefix) =>{
         //lokasi penyimpanan
    let defaultDir = './public'

    //disk storage untuk menyimpan file dari front end ke dir BE
    const storage = multer.diskStorage({
        destination:(req, file, cb)=>{
            const pathDir = defaultDir + directory

            if(fs.existsSync(pathDir)){
                console.log('directory ada  ');
                cb(null, pathDir)
            }else{
                fs.mkdir(pathDir, {recursive:true}, err => cb(err, pathDir))
            }
        },
        filename:(req, file, cb)=>{
            let ext = file.originalname.split('.')
            let filename = fileNamePrefix + Date.now()+'.'+ext[ext.length - 1]
            cb(null, filename)
        }
    })
    const fileFilter = (req, file, cb) =>{
        const ext = /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG)/
        if(!file.originalname.match(ext)){
            return cb(new Error("Your file type are denied"), false)
        }
        cb(null, true)
    }
    return multer({
        storage,
        fileFilter
    })
    }
   
}