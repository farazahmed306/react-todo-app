import axios from "axios";
//import { returnErrors } from "../index";
import { LOGIN_SUCCESS, REGISTER_USER, LOGOUT_USER } from "./authTypes";

export const userRegister = async (userCredentials) => {
  await axios.post(
    "https://nodetodowithusers.herokuapp.com/user/register",
    userCredentials
  );
  return { type: REGISTER_USER };
  //console.log("hello umer :::::::::",responce);
};

export const loginStart = (userCredentials) => async (dispatch) => {
  console.log("Data Before request :::::::::", userCredentials);
  const responce = await axios.post(
    "https://nodetodowithusers.herokuapp.com/user/login",
    userCredentials
  );

  const data = responce.data;
  
  if (data.status === "success") {
    //console.log("Data after request :::::::::", data.data);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
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
