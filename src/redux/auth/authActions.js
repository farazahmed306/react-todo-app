import axios from "axios";
//import { returnErrors } from "../index";
import {
  LOGIN_SUCCESS,
  REGISTER_USER,
  LOGOUT_USER,
  LOGINERROR,
} from "./authTypes";

export const userRegister = async (userCredentials) => {
  await axios.post(
    "https://nodetodowithusers.herokuapp.com/user/register",
    userCredentials
  );
  return { type: REGISTER_USER };
  //console.log("hello umer :::::::::",responce);
};

export const loginStart = (userCredentials) => async (dispatch) => {
  //console.log("Data Before request :::::::::", userCredentials);
  const responce = await axios.post(
    "https://nodetodowithusers.herokuapp.com/user/login",
    userCredentials
  );
  //console.log("A for Apple :::::  ", responce);

  const data = responce.data;
  dispatch({ type: LOGINERROR, payload: null });
  if (data?.message === "Login Sucessfully") {
    // console.log("Happy bithday   :::::::::", data);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } else {
    //console.log("Happy birthday  not :-)  :::::::::", data.message);
    dispatch({ type: LOGINERROR, payload: data.message });
  }
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const userLogOut = () => {
  return {
    type: LOGOUT_USER,
  };
};

// export const loginFail = (error) => {
//   type: LOGIN_FAIL;
//   payload: error;
// };
