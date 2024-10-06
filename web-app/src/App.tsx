import React from "react";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./components/theme/ThemeContext";
import NavBar from "./components/NavBar";
import TaskPage from "./pages/TaskPage";

export default function App() {
  document.body.className = "bg-light-bg_primary dark:bg-dark-bg_primary";

  return (
    <ThemeProvider>
      <NavBar />
      <div className="container dark:text-dark-text pt-3">
        <TaskPage />
      </div>
    </ThemeProvider>
  );
}
