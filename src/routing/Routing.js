import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import TaskDetail from "../components/TaskDetail";
import About from "../pages/About";
import NavBar from "../components/NavBar";
import TodoForm from "../components/TodoForm";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { useSelector } from "react-redux";

const Routing = () => {
  const isAuth = useSelector((state) => state.auth.token);
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Login />} />
          <Route
            path="/task/:taskId"
            element={isAuth ? <TaskDetail /> : <Login />}
          />
          <Route
            path="/addNewTask"
            element={isAuth ? <TodoForm /> : <Login />}
          />
          <Route path="/about" element={isAuth ? <About /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
