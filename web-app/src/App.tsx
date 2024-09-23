import React from "react";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./components/ThemeContext";
import AppRouter from "./AppRouter";

export default function App() {
  document.body.className = "bg-light-bg_primary dark:bg-dark-bg_primary";

  return (
    <ThemeProvider>
      <AppRouter/>
    </ThemeProvider>
  );
}
