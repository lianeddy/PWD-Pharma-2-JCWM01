const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");

module.exports = {
  getData: (req, res) => {
    req.body.password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");
    let scriptQuery = `SELECT * FROM user WHERE username = ${db.escape(
      req.body.username
    )} AND password = ${db.escape(req.body.password)};`;

    db.query(scriptQuery, (err, results) => {
      console.log(results);
      if (err) return res.status(500).send(err);
      if (results[0]) {
        let {
          id_user,
          username,
          email,
          password,
          address,
          phone_number,
          full_name,
          gender,
          age,
          profile_picture,
          role,
          status,
        } = results[0];
        let token = createToken({
          id_user,
          username,
          email,
          password,
          address,
          phone_number,
          full_name,
          gender,
          age,
          profile_picture,
          role,
          status,
        });
        if (status != "verified") {
          return res
            .status(200)
            .send({ dataLogin: null, message: "Your account is not verified" });
        } else {
          return res
            .status(200)
            .send({ dataLogin: results[0], token, message: "Login Success" });
        }
      } else {
        // Jika tidak dapat data (user not found)
        return res.status(200).send({ dataLogin: 1, message: "Login Failed" });
      }
    });
  },
  changePassword: (req, res) => {
    // let newPassword = "12345"
    // let updateQuery = `UPDATE user SET password = '${newPassword}' WHERE id_user = ${req.params.id}`
    req.body.currentPass = Crypto.createHmac("sha1", "hash123")
      .update(req.body.currentPass)
      .digest("hex");

    let selectQuery = `SELECT password FROM user WHERE id_user = ${db.escape(
      req.params.id
    )}`;
    console.log(selectQuery);

    req.body.newPass = Crypto.createHmac("sha1", "hash123")
      .update(req.body.newPass)
      .digest("hex");

    let updateQuery = `UPDATE user SET password = ${db.escape(
      req.body.newPass
    )} WHERE id_user = ${db.escape(req.params.id)}`;
    console.log(updateQuery);

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      if (results[0].password == req.body.currentPass) {
        db.query(updateQuery, (err2, results2) => {
          if (err2) return res.status(500).send(err2);
          return res.status(200).send(results2);
        });
      } else {
        return res.status(500).json({ message: "Current Password is Wrong" });
      }
    });
  },
  resetEmailPass: (req, res) => {
    let selectQuery = `SELECT * FROM user WHERE email = ${db.escape(
      req.body.email
    )}`;
    console.log(selectQuery);

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      if (results[0]) {
        return res
          .status(200)
          .send({ dataUser: results[0], message: "Email Exists" });
      } else {
        return res
          .status(200)
          .send({ dataUser: null, message: "Email doesn't Exist" });
      }
    });
  },
  resetPass: (req, res) => {
    let selectQuery = `SELECT * FROM user WHERE id_user = ${db.escape(
      req.params.id
    )}`;
    console.log(selectQuery);

    req.body.newPass = Crypto.createHmac("sha1", "hash123")
      .update(req.body.newPass)
      .digest("hex");

    let updateQuery = `UPDATE user SET password = ${db.escape(
      req.body.newPass
    )} WHERE id_user = ${db.escape(req.params.id)}`;
    console.log(updateQuery);

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      if (results[0]) {
        db.query(updateQuery, (err2, results2) => {
          if (err2) return res.status(500).send(err2);
          return res.status(200).send(results2);
        });
      }
    });
  },

  addData: (req, res) => {
    console.log(req.body);
    let {
      username,
      email,
      password,
      address,
      phone_number,
      fullname,
      gender,
      age,
      profile_picture,
    } = req.body;
    password = Crypto.createHmac("sha1", "hash123")
      .update(password)
      .digest("hex");
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
              );`;
    console.log(insertQuery);
    db.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      console.log(results);
      if (results.insertId) {
        let sqlGet = `select * from user where id_user = ${results.insertId};`;
        db.query(sqlGet, (err2, results2) => {
          if (err2) {
            console.log(err2);
            res.status(500).send(err2);
          }
          //bahantoken
          let {
            id_user,
            username,
            email,
            password,
            address,
            phone_number,
            fullname,
            gender,
            age,
            profile_picture,
            role,
            status,
          } = results2[0];
          //buat token
          let token = createToken({
            id_user,
            username,
            email,
            password,
            address,
            phone_number,
            fullname,
            gender,
            age,
            profile_picture,
            role,
            status,
          });

          let mail = {
            from: "admin <sodikin.purwadhika@gmail.com>",
            to: `${email}`,
            subject: "verification account",
            html: `<h3>Welcome to the pharma website, click the verification link below to continue using the website</h3><a href='http://localhost:3000/authentication/${token}'>click here for verification your account</a>`,
          };
          transporter.sendMail(mail, (errMail, resMail) => {
            if (errMail) {
              console.log(errMail);
              res
                .status(500)
                .send({
                  Message: "registration fail ",
                  success: false,
                  err: errMail,
                });
            }
            res
              .status(200)
              .send({
                Message: "registration succes check your email",
                success: true,
              });
          });
        });
      }
    });
  },
  verification: (req, res) => {
    let updateQuery = `Update user set status = 'verified' where id_user = ${req.user.id_user};`;

    db.query(updateQuery, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(200).send({ message: "verified account", success: true });
    });
  },
  editData: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let updateQuery = `update user set ${dataUpdate} where id_user = ${req.params.id};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  changeProfile :(req, res)=>{
    let dataUpdate = []
    for(let prop in req.body){
        dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
    }

    let updateQuery = `update user set ${dataUpdate} where id_user = ${req.params.id};`
    db.query(updateQuery,(err, results) =>{
        if(err)res.status(500).send(err)
        res.status(200).send(results)
    })
},

  deleteData: (req, res) => {
    let deleteQuery = `delete from user where id_user = ${db.escape(
      req.params.id_user
    )};`;
    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  getProfile : (req, res) =>{
    let scriptQuery = `select * from user where id_user = ${db.escape(req.params.id)};`
   
    db.query(scriptQuery,(err, results) =>{
        if(err) res.status(500).send(err)
        res.status(200).send(results)
       
    })
};
