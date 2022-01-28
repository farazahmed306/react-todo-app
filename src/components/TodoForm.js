import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addTask, updateTask } from "../redux/todo/todoActions";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const Input = styled.input`
  min-width: 50%;
  margin: 10px 0;
  padding: 10px;
`;
const Label = styled.label`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;
const ImageInput = styled.input.attrs({ type: "file" })`
  padding: 5px;
  font-weight: 400;
`;

const Radio = styled.input.attrs({ type: "checkbox" })``;

const LabelText = styled.span`
  font-size: 13px;
  font-weight: 400;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 9px 14px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const TodoForm = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [isComplete, setIsComplete] = useState(false);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const taskToBeEdit = location.state;

  const user = useSelector((state) => state.auth.user);
  //console.log("A for apple::::::",user._id)

  useEffect(() => {
    if (taskToBeEdit) {
      setTitle(taskToBeEdit.title);
      setDescription(taskToBeEdit.description);
      setIsComplete(taskToBeEdit.isComplete);
    }
    return () => {
      console.log("destructor");
    };
  }, [taskToBeEdit]);

  const onTaskSubmitHandler = (event) => {
    event.preventDefault();

  

    //If Task is tobe Update
    if (taskToBeEdit) {
      const newTask = new FormData();
      console.log(image);
      newTask.append("title", title);
      newTask.append("userId", user._id);
      newTask.append("image", image);
      newTask.append("description", description);
      newTask.append("isComplete", isComplete);

      dispatch(updateTask(taskToBeEdit._id, newTask));
    } else {
      const newTask = new FormData();
      console.log(image);
      newTask.append("userId", user._id);
      newTask.append("title", title);
      newTask.append("image", image);
      newTask.append("description", description);
      newTask.append("isComplete", isComplete);

      // console.log("helle petter parker ::::", newTask);

      dispatch(addTask(newTask));
    }

    setTitle("");
    setDescription("");
    setIsComplete(false);

    navigate("/");
  };
  return (
    <Container>
      <Title>Add Todo</Title>
      <Form onSubmit={onTaskSubmitHandler}>
        <Input
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Enter Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />{" "}
        <ImageInput
          placeholder="Enter image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Label>
          <Radio value={isComplete} onChange={(e) => setIsComplete(true)} />
          <LabelText>Completed</LabelText>
        </Label>
        <Button type="submit">{taskToBeEdit ? "Update" : "Submit"}</Button>
      </Form>
    </Container>
  );
};

export default TodoForm;
