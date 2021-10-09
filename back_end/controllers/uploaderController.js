const {db} = require('../database')
const {uploader} = require('../helper/uploader')
const fs = require('fs')


module.exports=({
    uploadImg : (req, res)=>{
        try{
            let path = `/images`
            const upload = uploader(path, 'IMG').fields([{name : 'file'}])
            upload(req, res, (error)=>{
                if(error){
                    console.log(error);
                    res.status(500).send(error)
                }
                const { file} = req.files 
                const filepath = file ? path +'/'+ file[0].filename : null

                
                req.body.profile_picture = filepath

                let sqlUpdate = `update user set profile_picture = ${db.escape(filepath)} where id_user = ${req.params.id};`
                db.query(sqlUpdate,(err, results)=>{
                    if(err){

                        console.log(err);
                        fs.unlinkSync(`./public`+filepath)
                        res.status(500).send(err)
                    }
                    console.log(sqlUpdate);
                    res.status(200).send({message:"upload file success"})
                })

            })

        }catch(error){
            console.log(error);
            res.status(500).send(error)

        }
    }
})