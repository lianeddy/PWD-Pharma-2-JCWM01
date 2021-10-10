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
                    res.status(200).send({results})
                })

            })

        }catch(error){
            console.log(error);
            res.status(500).send(error)

        }
    },
    getProfileImage : (req, res)=>{
        let sqlGet = `select profile_picture from user where id_user = ${db.escape(req.params.id)};`
        db.query(sqlGet,(err, results)=>{
            if(err){
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    }
})