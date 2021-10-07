import Axios from "axios";
import { URL_API } from "../../helper";

// export const loginUser = ({ username, password }) => {
//   return (dispatch) => {
//     Axios.post(`${URL_API}/user/login`, {
//       username,
//       password
//     })
//     .then((res) => {
//       if (res.data.length) {
//         console.log(username, password)
//         if (password === res.data[0].password) {
//           delete res.data[0].password

//           localStorage.setItem("userDataEmmerce", JSON.stringify(res.data[0]))

//           dispatch({
//             type: "USER_LOGIN",
//             payload: res.data[0]
//           })
//         } else {
//           // Handle error wrong password
//           dispatch({
//             type: "USER_ERROR",
//             payload: "Wrong Password!"
//           })
//         }
//       } else {
//         // Handle error username not found
//         dispatch({
//           type: "USER_ERROR",
//           payload: "Username or Password is Wrong"
//         })
//       }
//     })
//     .catch((err) => {
//       console.log(err)
//       alert("Terjadi kesalahan di server")
//     })
//   }
// }

export const onBtnLogin = ({ username, password }) => {
  return (dispatch) => {
    console.log(username, password)
    if (username  == "" || password == "") {
      alert("Fill in All the Form")
    }

    Axios.post(`${URL_API}/user/login`, {
      username,
      password
    })
    .then((res) => {
      if (res.data.dataLogin !== 1) {
        if (res.data.dataLogin) {
          alert("Login Succes")
          console.log("Login Success ✔")
          console.log(res.data)
          localStorage.setItem("userDataEmmerce", res.data.dataLogin)
          dispatch({
            type: "USER_LOGIN",
            payload: res.data.dataLogin
          })
        } else {
          dispatch({
            type: "USER_ERROR",
            payload: "Your Account is not Verified. Please Verify your Account!"
          })
        }
      } else {
        dispatch({
          type: "USER_ERROR",
          payload: "Wrong Username or Password"
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const submitBtnResetEmail = ({email}) => {
  return (dispatch) => {
    if (email == "") {
      return alert("Fill in All the Form")
    }

    Axios.post(`${URL_API}/user/reset-email`, {
      email
    })
    .then(res => {
      if (res.data.dataUser) {
        console.log("Email Exists")
        console.log(res.data)
        alert("Continue to reset password")
        dispatch({
          type: "RESET_EMAIL_PASS",
          payload: res.data.dataUser
        })
      } else {
        dispatch({
          type: "RESET_EMAIL_ERROR",
          payload: "Your Email doesn't Exist"
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}

// export const submitBtnResetPass = ({newPass, confNewPass}) => {
//   return (dispatch) => {
//     if (newPass == "" || confNewPass == "") {
//       return alert("Fill in All the Form")
//     }

//     // Axios.post(`${URL_API}/user/reset-email`, {
//     //   email
//     // })
//     // .then(res => {
//     //   if (res.data.dataUser) {
//     //     console.log("Email Exists")
//     //     console.log(res.data)
//     //     alert("Continue to reset password")
//     //     dispatch({
//     //       type: "RESET_EMAIL_PASS",
//     //       payload: res.data.dataUser
//     //     })
//     //   } else {
//     //     dispatch({
//     //       type: "RESET_EMAIL_ERROR",
//     //       payload: "Your Email doesn't Exist"
//     //     })
//     //   }
//     // })
//     // .catch(err => {
//     //   console.log(err)
//     // })
//   }
// }

// export const onBtnSubmit = ({currentPass, newPass, confNewPass}) => {
//   // const {currentPass, newPass, confNewPass} = this.state
//   // console.log(currentPass, newPass, confNewPass)

//   return(dispatch) => {
//     if (currentPass == "" || newPass == "" || confNewPass == "" ) {
//       alert("Fill in All the Form")
//     } else if (newPass !== confNewPass) {
//       alert("New Password Confirmation is not Matched")
//     } else {
//       Axios.patch(`${URL_API}/user/change/${this.props.userGlobal.id_user}`, {
//         newPass,
//         currentPass
//       })
//       .then(res => {
//         alert("Password Changed Successfully")
//         console.log("Password Changed Successfully")
//         dispatch({
//           type: "USER_CHANGE_PASS",
//           payload: res.data.dataLogin
//         })
//       })
//       .catch(err => {
//         alert("Your Current Password is Wrong")
//         console.log(err)
//       })
//     }
//   }
// }