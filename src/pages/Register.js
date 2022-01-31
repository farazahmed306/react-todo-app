import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/auth/authActions";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  ${
    "" /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover; */
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
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
  ${"" /* flex-wrap: wrap; */}
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  margin: 20px 0px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const ErrorField = styled.div`
  font-size: 12px;
  color: red;
`;
const Register = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // When Form will be submit it will come here
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // It will reassign all error fields to false again
    setUserNameError(false);
    setEmailError(false);
    setPasswordError(false);

    if (userData.userName.length < 5) {
      setUserNameError(true);
    }
    // Validates Email field if it is correct or not if it is not correct then it will assign emailerror variable to true
    if (!userData.email.includes("@") || !userData.email.includes(".")) {
      setEmailError((preState) => !preState);
    }
    if (userData.password.length < 6) {
      setPasswordError((preState) => !preState);
    }
    if (!emailError && !passwordError && !userNameError) {
      if (userData.userName && userData.email && userData.password) {
        // console.log("helloooooooooo")
        dispatch(userRegister(userData));
        navigate("/login");
      }
    }
  };
  return (
    <Container>
      {" "}
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>

        <Form onSubmit={onSubmitHandler}>
          <Input
            placeholder="username"
            type={"text"}
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
          />
          {userNameError ? (
            <ErrorField>Please Enter more then 5 word name</ErrorField>
          ) : null}
          <Input
            placeholder="email"
            //type={"email"}
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
            // type={"password"}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
          />
          {passwordError ? (
            <ErrorField>Please Enter 6 digit password</ErrorField>
          ) : null}

          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
