import Axios from "axios";
import { URL_API } from "../../helper";

export const onBtnLogin = ({ username, password }) => {
  return (dispatch) => {
    console.log(username, password);
    if (username == "" || password == "") {
      alert("Fill in All the Form");
    }

    Axios.post(`${URL_API}/user/login`, {
      username,
      password,
    })
      .then((res) => {
        if (res.data.dataLogin !== 1) {
          if (res.data.dataLogin) {
            alert("Login Succes");
            console.log("Login Success ✔");
            console.log(res.data);
            localStorage.setItem("userDataEmmerce", JSON.stringify(res.data.dataLogin));
            dispatch({
              type: "USER_LOGIN",
              payload: res.data.dataLogin,
            });
          } else {
            dispatch({
              type: "USER_ERROR",
              payload:
                "Your Account is not Verified. Please Verify your Account!",
            });
          }
        } else {
          dispatch({
            type: "USER_ERROR",
            payload: "Wrong Username or Password",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const submitBtnResetEmail = ({ email }) => {
  return (dispatch) => {
    if (email == "") {
      return alert("Fill in All the Form");
    }

    Axios.post(`${URL_API}/user/reset-email`, {
      email,
    })
      .then((res) => {
        if (res.data.dataUser) {
          console.log("Email Exists");
          console.log(res.data);
          alert("Continue to reset password");
          dispatch({
            type: "RESET_EMAIL_PASS",
            payload: res.data.dataUser,
          });
        } else {
          dispatch({
            type: "RESET_EMAIL_ERROR",
            payload: "Your Email doesn't Exist",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userDataEmmerce")

  return {
    type: "USER_LOGOUT"
  }
}

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.post(`${URL_API}/user/keep-login`, {
      id_user: userData.id_user
    })
    .then((res) => {
      localStorage.setItem("userDataEmmerce", JSON.stringify(res.data.dataLogin))

      dispatch({
        type: "USER_LOGIN",
        payload: res.data.dataLogin
      })
    })
    .catch((err) => {
      alert("Error has occurred")
      console.log(err)
    })
  }
}

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  }
}