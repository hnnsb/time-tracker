import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
