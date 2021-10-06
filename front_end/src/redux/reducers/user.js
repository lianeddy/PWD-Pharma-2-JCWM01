import {GET_USERS_DETAIL} from '../actions/user'
const init_state = {
    getUserDetail : false,
    errorUserDetail : false
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case GET_USERS_DETAIL:
        return {
          ...state,
          getUserDetail : action.payload.data,
          errorUserDetail : action.payload.errorMessage
        }
        default :

        return state;
    }
  };
  
  export default reducer;