import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginStart } from "../redux/auth/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  ${
    "" /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover; */
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const MyLink = styled.div`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`;
const ErrorField = styled.div`
  font-size: 12px;
  color: red;
`;

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const userLoginError = useSelector((state) => state.auth.loginErrorMessage);
  // const [userLoginError, setUserLoginError] = useState(
  //   useSelector((state) => state.auth.loginErrorMessage)
  // );

  useEffect(() => {
    if (userLoginError) {
      notify();
    }
  }, [userLoginError]);
  const notify = () =>
    toast.error(userLoginError, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onSubmitHandler = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    if (!userData.email.includes("@") || !userData.email.includes(".")) {
      setEmailError((preState) => !preState);
    }
    if (userData.password.length < 6) {
      setPasswordError((preState) => !preState);
    }
    if (!emailError && !passwordError) {
      if (userData.password && userData.email) {
        dispatch(loginStart(userData));
        navigate("/");
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={onSubmitHandler}>
          <Input
            placeholder="Enter email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          {emailError ? (
            <ErrorField>Please Enter Correct email</ErrorField>
          ) : null}
          <Input
            placeholder="password"
            type={"password"}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
          />
          {passwordError ? (
            <ErrorField>Please Enter 6 digit password</ErrorField>
          ) : null}
          <Button type="submit">LOGIN</Button>
          <Link to={"/login"}>
            <MyLink>DO NOT YOU REMEMBER THE PASSWORD?</MyLink>
          </Link>
          <Link to={"/register"}>
            <MyLink>CREATE A NEW ACCOUNT</MyLink>
          </Link>
        </Form>
      </Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default Login;
