const init_state = {
    username: "",
    fullName: "",
    email: "",
    role: "",
    id: 0,
    errMsg: "",
  };
  
  const reducer = (state = init_state, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        return { ...state, ...action.payload };
      case "USER_ERROR":
          return { ...state, errMsg: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;