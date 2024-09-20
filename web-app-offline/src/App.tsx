import React from "react";
import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./components/ThemeContext";

export default function App() {
  document.body.className = " bg-light-bg_primary dark:bg-dark-bg_primary";

  return (
    <ThemeProvider>
      <NavBar />
      <div className="container dark:text-dark-text">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
