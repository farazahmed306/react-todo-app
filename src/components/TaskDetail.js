import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteTask, getTask } from "../redux/todo/todoActions";

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
const Description = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const Image = styled.img`
  width: 58vw vw;
  height: 40vh;
  object-fit: contain;
  margin: 10px 1px;
`;

const Checked = styled.span`
  font-size: 13px;
  font-weight: 400;
`;
const Buttons = styled.div``;
const Button = styled.button`
  width: 90px;
  border: none;
  padding: 9px 14px;
  background-color: crimson;
  color: white;
  cursor: pointer;
  font-size: smaller;
  font-weight: 500;
  margin-top: 6px;
  margin-right: 9px;
`;

const TaskDetail = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTask(taskId));
  }, [taskId]);
  const taskItem = useSelector((state) => state.task.task);
  const user = useSelector((state) => state.auth.user);
  //console.log("garbage data ::::::::::", taskItem.userId,user._id);
  return (
    <Container>
      {taskItem ? (
        <Wrapper>
          <Title>{taskItem.title}</Title>

          <Description>{taskItem.description}</Description>
          <Image src={`${taskItem.image}`} />
          {taskItem.isComplete ? (
            <Checked>it is Completed</Checked>
          ) : (
            <Checked>it is Not Completed</Checked>
          )}
          {taskItem?.userId?._id === user?._id && (
            <Buttons>
              <Button
                style={{ backgroundColor: "#EC9C29" }}
                onClick={() => {
                  navigate("/addNewTask", { state: taskItem });
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  dispatch(deleteTask(taskItem._id));
                  navigate("/");
                }}
              >
                Delete
              </Button>
            </Buttons>
          )}
        </Wrapper>
      ) : null}
    </Container>
  );
};

export default TaskDetail;
