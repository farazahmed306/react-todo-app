import { ADD_TASK, DELETE_TASK, GET_TASKSLIST, GET_TASK } from "./todoTypes";

const initialState = {
  tasksList: JSON.parse(localStorage.getItem("tasksList")) || [],
  task: {},
};
//localStorage.setItem("tasksList", JSON.stringify(action.payload));
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKSLIST:
      // localStorage.setItem("tasksList", JSON.stringify(action.payload,...state));
      return {
        ...state,
        tasksList: action.payload,
      };
    case ADD_TASK:
      localStorage.setItem(
        "tasksList",
        JSON.stringify([action.payload, ...state.tasksList])
      );
      return {
        ...state,
        tasksList: [action.payload, ...state.tasksList],
      };

    case GET_TASK:
      console.log("Hello faraz", action.payload);
      return {
        ...state,
        task: action.payload,
      };
    case DELETE_TASK:
      localStorage.setItem(
        "tasksList",
        JSON.stringify(
          state.tasksList.filter((task) => task._id !== action.payload)
        )
      );
      return {
        ...state,
        tasksList: state.tasksList.filter(
          (task) => task._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
