import React from "react";
import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
