import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import ToDo from "./pages/ChecklistPage";
import TaskList from "./pages/TaskList";
import React from "react";
import NavBar from "./components/NavBar";

export enum RoutePaths {
  TASKS = "/",
  CHECKLIST = "/todo",
}

export default function AppRouter() {
  const Router = process.env.APPTARGET === "web" ? BrowserRouter : HashRouter;
  return (
    <Router>
      <NavBar />
      <div className="container dark:text-dark-text pt-3">
        <Routes>
          <Route path={RoutePaths.TASKS} element={<TaskList />} />
          <Route path={RoutePaths.CHECKLIST} element={<ToDo />} />
        </Routes>
      </div>
    </Router>
  );
}
