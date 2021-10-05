import Axios from "axios";
import { URL_API } from "../../helper";

export const loginUser = ({ username, password }) => {
    return (dispatch) => {
      Axios.get(`${URL_API}/user/login`, {
        params: {
          username,
        }
      })
      .then((result) => {
        if (result.data.length) {
          if (password === result.data[0].password) {
            delete result.data[0].password
  
            localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]))
  
            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0]
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
            payload: "Username not found"
          })
        }
      })
      .catch((err) => {
        console.log(err)
        alert("Terjadi kesalahan di server")
      })
    }
  }