import Axios from "axios";
import { URL_API } from "../../helper";

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    Axios.post(`${URL_API}/user/login`, {
      username,
      password
    })
    .then((res) => {
      if (res.data.length) {
        console.log(username, password)
        if (password === res.data[0].password) {
          delete res.data[0].password

          localStorage.setItem("userDataEmmerce", JSON.stringify(res.data[0]))

          dispatch({
            type: "USER_LOGIN",
            payload: res.data[0]
          })
        } else {
          // Handle error wrong password
          dispatch({
            type: "USER_ERROR",
            payload: "Wrong Password!"
          })
        }
      } else {
        // Handle error username not found
        dispatch({
          type: "USER_ERROR",
          payload: "Username or Password is Wrong"
        })
      }
    })
    .catch((err) => {
      console.log(err)
      alert("Terjadi kesalahan di server")
    })
  }
}