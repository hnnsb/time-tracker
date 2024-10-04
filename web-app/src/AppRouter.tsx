import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import ChecklistPage from "./pages/ChecklistPage";
import TaskPage from "./pages/TaskPage";
import React from "react";
import NavBar from "./components/NavBar";

export enum RoutePaths {
  TASKS = "/",
  CHECKLIST = "/checklist",
}

export default function AppRouter() {
  const Router = process.env.APPTARGET === "web" ? BrowserRouter : HashRouter;
  return (
    <Router>
      <NavBar />
      <div className="container dark:text-dark-text pt-3">
        <Routes>
          <Route path={RoutePaths.TASKS} element={<TaskPage />} />
          <Route path={RoutePaths.CHECKLIST} element={<ChecklistPage />} />
        </Routes>
      </div>
    </Router>
  );
}
