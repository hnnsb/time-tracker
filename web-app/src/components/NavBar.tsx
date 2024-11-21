import { Nav } from "react-bootstrap";
import React from "react";
import ThemeSwitcher from "./theme/ThemeSwitcher";
import SettingsDialog from "./SettingsDialog";

export default function NavBar() {
  return (
    <Nav className="p-1 flex justify-end flex-row bg-bg_secondary">
      <div className="flex flex-row align-items-center">
        <ThemeSwitcher className="mr-2" />
        <SettingsDialog />
      </div>
    </Nav>
  );
}
