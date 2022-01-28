import React from "react";
import styled from "styled-components";
import { Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, userLogOut } from "../redux/auth/authActions";

const Container = styled.div`
  height: 50px;
  width: 100%;
  background-color: #1877f2;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const Wrapper = styled.div`
  padding: 10px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const NavLink = styled.div`
  margin-right: 35px;
  font-size: 20px;
  color: white;
  font-weight: 500;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const IconRightSide = styled.div`
  margin-left: 27px;
  color: white;
  cursor: pointer;
`;
const UserName = styled.h3`
 color: white;
    cursor: pointer;
    margin-left: 10px;
    font-size: 20px;
`;

const NavBar = () => {
  const isAuth = useSelector((state) => state.auth.token);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>My ToDo List</Logo>
        </Left>

        <Center>
          {isAuth && (
            <>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <NavLink>Home</NavLink>
              </Link>
              <Link to={"/addNewTask"} style={{ textDecoration: "none" }}>
                {" "}
                <NavLink>Add Task</NavLink>
              </Link>
              <Link to={"/about"} style={{ textDecoration: "none" }}>
                {" "}
                <NavLink>About</NavLink>
              </Link>
            </>
          )}
        </Center>
        <Right>
          {isAuth && (
            <>
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                <IconRightSide onClick={() => dispatch(userLogOut())}>
                  <Person />
                </IconRightSide>
              </Link>
              <UserName>{user?.userName}</UserName>
            </>
          )}
          {!isAuth && (
            <>
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                {" "}
                <NavLink>Login</NavLink>
              </Link>
              <Link to={"/register"} style={{ textDecoration: "none" }}>
                {" "}
                <NavLink>Register</NavLink>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
