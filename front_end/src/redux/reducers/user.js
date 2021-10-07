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
    navbarLogin: true,
    storageIsChecked: false
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        return { ...state, ...action.payload, storageIsChecked: true };
      case "USER_CHANGE_PASS":
        return { ...state, ...action.payload, storageIsChecked: true };
      case "USER_ERROR":
        return { ...state, errMsg: action.payload, storageIsChecked: true };
      case "RESET_EMAIL_PASS":
        return { ...state, ...action.payload, navbarLogin: false, storageIsChecked: true };
      case "RESET_EMAIL_ERROR":
        return { ...state, errMsg: action.payload, navbarLogin: false, storageIsChecked: true };
      case "USER_LOGOUT":
        return { ...init_state, storageIsChecked: true };
      case "CHECK_STORAGE":
        return { ...state, storageIsChecked: true };
      default:
        return state;
    }
  };
  
  export default reducer;