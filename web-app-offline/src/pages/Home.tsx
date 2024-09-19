import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <div className={"m-1"}>Welcome to the Home Page</div>
      <Link to={"/tasks"}>Tasks</Link>
    </div>
  );
}
