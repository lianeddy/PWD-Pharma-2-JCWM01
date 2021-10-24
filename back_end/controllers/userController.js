const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");
const verification = require("../helper/verification")

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
            .send({
              dataLogin: null,
              token: null,
              message: "Your account is not verified",
            });
        } else {
          return res
            .status(200)
            .send({ dataLogin: results[0], token, message: "Login Success" });
        }
      } else {
        // Jika tidak dapat data (user not found)
        return res
          .status(200)
          .send({ dataLogin: 1, token: null, message: "Login Failed" });
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
  keepLogin: (req, res) => {
    let scriptQuery = `SELECT * FROM user WHERE id_user = ${db.escape(
      req.body.id_user
    )};`;

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

        return res
          .status(200)
          .send({
            dataLogin: results[0],
            token,
            message: "Keep Login Success",
          });
      } else {
        // Jika tidak dapat data (user not found)
        return res
          .status(200)
          .send({ dataLogin: null, token: null, message: "Keep Login Failed" });
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
            html: `<head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                @media screen {
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 700;
                        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 400;
                        src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 700;
                        src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                    }
                }
        
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                /* RESET STYLES */
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                }
        
                table {
                    border-collapse: collapse !important;
                }
        
                body {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                }
        
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
        
                /* MOBILE STYLES */
                @media screen and (max-width:600px) {
                    h1 {
                        font-size: 32px !important;
                        line-height: 32px !important;
                    }
                }
        
                /* ANDROID CENTER FIX */
                div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                }
            </style>
        </head>
        
        <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#07294d" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#07294d" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwdIR6-6TlPNgMhaYUhVVAkV89krIg7w4gTw&usqp=CAU" width="125" height="120" style="display: block; border: 0px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#07294d"><a href="http://localhost:3000/authentication/${token}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #07294d; display: inline-block;">Confirm Account</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                           
                            
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Cheers,<br>Pharma 2 Team</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                    <p style="margin: 0;">021-7777777</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>`,
          };
          transporter.sendMail(mail, (errMail, resMail) => {
            if (errMail) {
              console.log(errMail);
              res.status(500).send({
                Message: "registration fail ",
                success: false,
                err: errMail,
              });
            }
            res.status(200).send({
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
  changeProfile: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }

    let updateQuery = `update user set ${dataUpdate} where id_user = ${req.params.id};`;
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  changePhoto: (req, res) => {
    let updateQuery = `update user set profile_picture = ${req.body.profile_picture} where id_user = ${req.params.id};`;
    db.query(updateQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
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

  deleteData: (req, res) => {
    let deleteQuery = `delete from user where id_user = ${db.escape(
      req.params.id_user
    )};`;
    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  getProfile: (req, res) => {
    let scriptQuery = `select * from user where id_user = ${db.escape(
      req.params.id
    )};`;

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  
};
