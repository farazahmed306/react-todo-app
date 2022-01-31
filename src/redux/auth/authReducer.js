import {
  LOGOUT_USER,
  LOGIN_SUCCESS,
  REGISTER_USER,
  LOGINERROR,
} from "./authTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: JSON.parse(localStorage.getItem("token")) || null,
  loginErrorMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return state;

    case LOGIN_SUCCESS:
      // Storing for Local Stroage
      //console.log(action.payload.user)
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        user: action.payload.data,
        token: action.payload.token,
      };
    case LOGOUT_USER:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
      };

    case LOGINERROR:
      //console.log("Happy bithday  not :-)  :::::::::", action.payload);
      return {
        ...state,
        loginErrorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
