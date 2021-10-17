import Axios from "axios";
import { URL_API } from "../../helper";

export const searchProduct = (searchProduct) => {
  return (dispatch) => {
    dispatch({
      type: "SEARCH_PRODUCT",
      payload: searchProduct,
    });
  };
};

export const registerUser = ({ fullname, username, email, password }) => {
  return (dispatch) => {
    Axios.post(`${URL_API}/user/register`, {
      fullname,
      username,
      email,
      password,
    })

      //proses asyncronus
      .then((result) => {
        delete result.data.password;
        dispatch({
          type: "USER_LOGIN",
          payload: result.data,
        });
        alert("berhasil mendapatkan users");
      })
      .catch(() => {
        alert("gagal mendapatkan users");
      });
  };
};


export const loginUser = ({ username, password }) => {
    return (dispatch) => {
      Axios.get(`${URL_API}/user`, {
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
        alert("Terjadi kesalahan di server")
      })
    }
  }