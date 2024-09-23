import { Nav } from "react-bootstrap";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import SettingsDialog from "./SettingsDialog";
import { Link } from "react-router-dom";
import { RoutePaths } from "../AppRouter";

export default function NavBar() {
  return (
    <Nav className="p-2 flex justify-between flex-row bg-light-bg_secondary dark:bg-dark-bg_secondary">
      <div className="flex flex-row">
        <Nav.Item>
          <Nav.Link>
            <Link to={RoutePaths.HOME}>
              Home
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to={RoutePaths.TASKS}>
            Tasks
          </Link></Nav.Link>
        </Nav.Item>
      </div>
      <div className="flex flex-row align-items-center">
        <ThemeSwitcher className="mr-2"/>
        <SettingsDialog/>
      </div>
    </Nav>
  );
}
