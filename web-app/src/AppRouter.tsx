import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import React from "react";
import NavBar from "./components/NavBar";

export enum RoutePaths {
  HOME = "/",
  TASKS = "/tasks"
}

export default function AppRouter() {
  const Router = process.env.APP_TARGET === "desktop" ? HashRouter : BrowserRouter;
  return (
    <Router>
      <NavBar/>
      <div className="container dark:text-dark-text">
        <Routes>
          <Route path={RoutePaths.HOME} element={<Home/>}/>
          <Route path={RoutePaths.TASKS} element={<TaskList/>}/>
        </Routes>
      </div>
    </Router>
  );
}
