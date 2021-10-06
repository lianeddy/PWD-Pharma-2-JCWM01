import Axios from "axios";
import { URL_API } from "../../helper";


export const GET_USERS_DETAIL = "GET_USERS_DETAIL"

export const getUserDetail = (id) =>{
  return (dispatch) =>{
    Axios.get(`${URL_API}/user/getProfile`)
    .then((res)=>{
      dispatch({
        type : GET_USERS_DETAIL,
        payload : {
          data : res.data,
          errorMessage : false
        }
      })
    })
    .catch((error)=>{
      dispatch({
        type : GET_USERS_DETAIL,
        payload : {
          data : false,
          errorMessage : error.message
        }
      })
    })
  }

}

