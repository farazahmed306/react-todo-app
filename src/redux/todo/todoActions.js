import axios from "axios";
import { GET_TASKSLIST, DELETE_TASK, GET_TASK } from "./todoTypes";

export const getTasks = () => async (dispatch) => {
  const responce = await axios.get(
    "https://nodetodowithusers.herokuapp.com/todo"
  );
  const data = responce.data.data;
  dispatch({ type: GET_TASKSLIST, payload: data });
};

// Adding an NewTask
export const addTask = (newTask) => async (dispatch) => {
  await axios.post("https://nodetodowithusers.herokuapp.com/todo/", newTask);
  //dispatch({ type: ADD_TASK, payload: newTask });
  dispatch(getTasks());
};

/// Deleting an Task
export const deleteTask = (taskId) => async (dispatch) => {
  await axios.delete(`https://nodetodowithusers.herokuapp.com/todo/${taskId}`);
  dispatch({ type: DELETE_TASK, payload: taskId });
};

export const getTask = (taskId) => async (dispatch) => {
  const responce = await axios.get(
    `https://nodetodowithusers.herokuapp.com/todo/${taskId}`
  );
  const data = responce.data.data;
  //console.log("my data is here ",data);
  dispatch({ type: GET_TASK, payload: data });
};

export const updateTask = (taskId, updatedTask) => (dispatch) => {
  console.log("sfgsdfdfas:::::::: ", taskId, updatedTask);
  axios.put(
    `https://nodetodowithusers.herokuapp.com/todo/${taskId}`,
    updatedTask
  );

  dispatch(getTasks());
};
