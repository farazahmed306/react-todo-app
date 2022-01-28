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
  flex-wrap: wrap;
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

const Register = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (userData.userName && userData.email && userData.password) {
      dispatch(userRegister(userData));
      navigate("/login");
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
              setUserData({ ...userData, ["userName"]: e.target.value })
            }
          />
          <Input
            placeholder="email"
            type={"email"}
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, ["email"]: e.target.value })
            }
          />
          <Input
            placeholder="password"
            type={"password"}
            onChange={(e) =>
              setUserData({ ...userData, ["password"]: e.target.value })
            }
            value={userData.password}
          />

          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
