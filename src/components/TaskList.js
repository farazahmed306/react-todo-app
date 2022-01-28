import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getTasks } from "../redux/todo/todoActions";

const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background-color: rgb(221, 201, 201);
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  margin-bottom: 12px;

  background-color: azure;
  flex-direction: column;
`;
const Title = styled.h3`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const TaskList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);
  const tasks = useSelector((state) => state.task.tasksList);
  console.log("hey thoisdhsad :::::",tasks);

  return (
    <Container>
      {tasks.map((task) => (
        <Link
          to={`/task/${task._id}`}
          style={{ textDecoration: "none" }}
          key={task._id}
        >
          <Wrapper>
            <Title>{task.title}</Title>
          </Wrapper>
        </Link>
      ))}
    </Container>
  );
};

export default TaskList;
