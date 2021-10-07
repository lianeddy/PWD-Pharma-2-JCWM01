const init_state = {
    id_user: 0,
    username: "",
    email: "",
    address: "",
    phone_number: 0,
    full_name: "",
    gender: "",
    age: 0,
    profile_picture: "",
    role: "",
    status: "",
    errMsg: "",
    navbarLogin: true
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        return { ...state, ...action.payload };
      case "USER_CHANGE_PASS":
        return { ...state, ...action.payload };
      case "USER_ERROR":
        return { ...state, errMsg: action.payload };
      case "RESET_EMAIL_PASS":
        return { ...state, ...action.payload, navbarLogin: false };
        case "RESET_EMAIL_ERROR":
          return { ...state, errMsg: action.payload, navbarLogin: false };
      default:
        return state;
    }
  };
  
  export default reducer;